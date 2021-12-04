import styles from "../styles/Exchange.module.scss";
import ExchangeBar from "./ExchangeBar";
import ltc from "../public/ltc.svg";
import eth from "../public/eth.svg";
import Image from "next/image";

const Exchange = () => {
  return (
    <div className={styles.exchange}>
      <Image
        src={ltc}
        alt="ltc"
        width={500}
        height={500}
        className={styles.nextImg}
      />
      <Image
        src={ltc}
        alt="ltc"
        width={500}
        height={500}
        className={styles.nextImg}
      />
      <div className={styles.titleBox}>
        <h1 className={styles.title}>Exchange Name</h1>
        <h3 className={styles.subtitle}>
          The Fastest And Most Reliable Crpto Exchange On The Web
        </h3>
      </div>
      <ExchangeBar />
    </div>
  );
};

export default Exchange;
