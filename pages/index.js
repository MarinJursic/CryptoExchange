import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.scss";
import Exchange from "../components/Exchange";
import CryptoData from "../components/CryptoData";
import ExchangeBar from "../components/ExchangeBar";
import { useState } from "react";

export default function Home(props) {
  const [Continue, setContinue] = useState(false);

  const [values, setValues] = useState({
    crypto: "BTC",
    amount: undefined,
    wallet: "",
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Exchange</title>
        <meta name="description" content="Crypto Exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Exchange
        setContinue={setContinue}
        values={values}
        setValues={setValues}
      />
      <CryptoData data={props} />
      <ExchangeBar
        setContinue={setContinue}
        values={values}
        setValues={setValues}
      />
    </div>
  );
}

export async function getStaticProps() {
  const urls = [
    "https://api.coingecko.com/api/v3/coins/bitcoin?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false",
    "https://api.coingecko.com/api/v3/coins/ethereum?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false",
    "https://api.coingecko.com/api/v3/coins/bitcoin-cash?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false",
    "https://api.coingecko.com/api/v3/coins/litecoin?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false",
  ];

  const btc = await fetch(urls[0]);
  const eth = await fetch(urls[1]);
  const bch = await fetch(urls[2]);
  const ltc = await fetch(urls[3]);

  return {
    props: {
      btc: await btc.json(),
      eth: await eth.json(),
      bch: await bch.json(),
      ltc: await ltc.json(),
    },
  };
}
