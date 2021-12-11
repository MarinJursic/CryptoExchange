import { useState, useEffect } from "react";
import styles from "../styles/CryptoData.module.scss";
import btc from "../public/btc.svg";
import bch from "../public/bch.svg";
import Image from "next/dist/client/image";

const CryptoData = ({ data }) => {
  const [coins, setCoins] = useState(undefined);

  useEffect(() => {
    setCoins([data.btc, data.eth, data.bch, data.ltc]);
  }, [data]);

  return (
    <div className={styles.cryptoData}>
      <div className={styles.imgDiv}>
        <div className={styles.opacity}>
          <Image src={btc} alt="ltc" width={400} height={400} />
        </div>
        <div className={styles.opacity}>
          <Image src={bch} alt="ltc" width={400} height={400} />
        </div>
      </div>
      {coins !== undefined &&
        coins.map((coin) => (
          <div className={styles.coinRow}>
            <div className={styles.coin}>
              <div className={styles.left}>
                <img src={coin.image.small} alt="crypto" />
                <h3>{coin.name}</h3>
              </div>
              <p className={styles.coinSymbol}>{coin.symbol}</p>
            </div>
            <div className={styles.coinData}>
              <p className={styles.coinPrice}>
                $
                {coin.market_data.current_price.usd.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className={styles.coinVolume}>
                $
                {coin.market_data.total_volume.usd.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>
              {coin.market_data.price_change_percentage_24h > 0 ? (
                <p className={styles.positive}>
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              ) : (
                <p className={styles.negative}>
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CryptoData;
