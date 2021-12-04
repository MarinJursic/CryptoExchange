import styles from "../styles/ExchangeBar.module.scss";
import {
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Popover,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import btc from "../public/btc.svg";
import eth from "../public/eth.svg";
import ltc from "../public/ltc.svg";
import bch from "../public/bch.svg";
import Image from "next/image";

const ExchangeBar = () => {
  const [imgs] = useState({
    BTC: btc,
    ETH: eth,
    LTC: ltc,
    BCH: bch,
  });

  const [values, setValues] = useState({
    crypto: "BTC",
    amount: undefined,
    wallet: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const validateAmount = () => {
    if (values.amount >= 25 && values.amount <= 1000) {
      setValues({ ...values, amount: parseFloat(values.amount).toFixed(2) });
      return;
    } else if (values.amount > 1000) {
      setValues({ ...values, amount: parseFloat(1000).toFixed(2) });
    } else {
      setValues({ ...values, amount: undefined });
    }
  };

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  return (
    <div className={styles.exchangeBar}>
      <h4 className={styles.warningText}>
        When exchanging make sure your wallet supports the currency you are
        exchanging to, otherwise your currency might get lost
      </h4>
      <div className={styles.bar}>
        <div className={styles.crypto}>
          <Image
            src={imgs[values.crypto]}
            alt="Crypto image"
            width={200}
            height={200}
          />
          <Select
            labelId="crypto-select-label"
            id="crypto-select"
            value={values.crypto}
            onChange={handleChange("crypto")}
            className={styles.sel}
          >
            <MenuItem value={"BTC"}>BTC</MenuItem>
            <MenuItem value={"ETH"}>ETH</MenuItem>
            <MenuItem value={"BCH"}>BCH</MenuItem>
            <MenuItem value={"LTC"}>LTC</MenuItem>
          </Select>
        </div>
        <div className={styles.currency}>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount === undefined ? "" : values.amount}
            onChange={handleChange("amount")}
            onBlur={validateAmount}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            placeholder="0.00"
          />
        </div>
        <div className={styles.wallet}>
          <input
            type="string"
            placeholder="Enter your external wallet address"
            onChange={handleChange("wallet")}
            value={values.wallet}
          />
          <Typography
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <BsFillInfoCircleFill />
          </Typography>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography
              sx={{ p: 1 }}
              style={{ width: "17.5rem", fontSize: "14px" }}
            >
              What is a wallet address? The wallet address is the unique
              identifier of your Wallet and it is composed of around 25 – 30
              alphanumeric characters. A Wallet Address can only be used to make
              transactions into such wallet, so it's safe to share with other
              people for them to make a transfer to your wallet.
            </Typography>
          </Popover>
        </div>
      </div>
      <button type="submit">Exchange</button>
    </div>
  );
};

export default ExchangeBar;
