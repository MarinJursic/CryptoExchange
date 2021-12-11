import styles from "../styles/Exchange.module.scss";
import ExchangeBar from "./ExchangeBar";
import ltc from "../public/ltc.svg";
import eth from "../public/eth.svg";
import Image from "next/image";

const Exchange = ({ setContinue, values, setValues }) => {
  return (
    <div className={styles.exchange}>
      <div className={styles.titleBox}>
        <h1 className={styles.title}>KepBit</h1>
        <h3 className={styles.subtitle}>
          The Fastest And Most Reliable Crpto Exchange On The Web
        </h3>
      </div>
      <a href="#exchange">Exchange</a>
    </div>
  );
};

export default Exchange;
