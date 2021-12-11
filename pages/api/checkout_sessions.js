const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { item, amount, wallet } = req.body;

    let quantity = Math.trunc(amount);

    const prices = {
      BTC: "price_1K4pXEBA7q79hpEJjpvRmPPi",
      LTC: "price_1K4pXlBA7q79hpEJLNhFReMJ",
      BCH: "price_1K4pY7BA7q79hpEJuKIplsxF",
    };

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: prices[item],
            quantity: quantity,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true&sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        metadata: {
          wallet: wallet,
          amount: amount,
        },
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
