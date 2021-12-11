import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

var Client = require("coinbase").Client;
var client = new Client({
  apiKey: process.env.COINBASE_API_KEY,
  apiSecret: process.env.COINBASE_SECRET_KEY,
  strictSSL: false,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    let event;

    try {
      const rawBody = await buffer(req);
      const signature = req.headers["stripe-signature"];

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === "checkout.session.completed") {
        const { amount, wallet, crypto } = event.data.metadata;
        let price = 0;
        client.getBuyPrice(
          { currencyPair: `${crypto}-USD` },
          function (err, obj) {
            price = obj.data.amount;
          }
        );
        let account = undefined;
        client.getAccounts({}, function (err, accounts) {
          accounts.forEach(function (acct) {
            if (acct.balance.currency === crypto) {
              account = acct;
            }
          });
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        let cryptoAmount = amount / 100 - (amount / 100) * 0.11;
        cryptoAmount = cryptoAmount / price;
        var args = {
          to: wallet,
          amount: `${cryptoAmount.toFixed(8)}`,
          currency: crypto,
          description: "Test Transaction",
        };

        console.log("Wallet: " + args.to);
        console.log("Amount: " + args.amount);
        console.log("Currency: " + args.currency);

        /*

        account.sendMoney(args, function (err, txn) {
          console.log("Error: " + err);
          console.log("my txn id is: " + txn.id);
        });
        */
      } else {
        console.warn("Unhandled event type");
      }

      res.json({ recieved: true });
    } catch (error) {
      console.log("Error Message: " + err.message);
      res.status(400).send("Webhook error: " + err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
