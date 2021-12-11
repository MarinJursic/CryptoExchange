import styles from "../styles/ExchangeBar.module.scss";
import {
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Popover,
  Typography,
  formControlClasses,
} from "@mui/material";
import { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import btc from "../public/btc.svg";
import eth from "../public/eth.svg";
import ltc from "../public/ltc.svg";
import bch from "../public/bch.svg";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ExchangeBar = ({ setContinue, values, setValues }) => {
  const router = useRouter();

  const { success, cancelled, sessionId } = router.query;

  const [imgs] = useState({
    BTC: btc,
    ETH: eth,
    LTC: ltc,
    BCH: bch,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const validateAmount = () => {
    if (values.amount >= 5 && values.amount <= 300) {
      setValues({
        ...values,
        amount: Math.round(parseFloat(values.amount).toFixed(2)).toFixed(2),
      });
      return;
    } else if (values.amount > 300) {
      setValues({
        ...values,
        amount: Math.round(parseFloat(300).toFixed(2)).toFixed(2),
      });
    } else {
      setValues({ ...values, amount: undefined });
    }
  };

  const handleSubmit = () => {
    if (values.amount !== undefined && values.wallet !== "") {
      setContinue(true);
    }
  };
  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  useEffect(() => {
    if (values.amount !== undefined && values.wallet !== "") {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [values]);

  useEffect(async () => {
    if (success !== undefined || cancelled !== undefined) {
      if (success) {
        if (sessionId !== undefined) {
          const data = await axios.post(
            "/api/check_session",
            {
              id: sessionId,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
        console.log("Successful transaction");
      } else {
        console.log("Transaction cancelled");
      }
    }
  }, [success, cancelled]);

  return (
    <div className={styles.exchangeBar}>
      <h1 id="exchange">Exchange</h1>
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
      <form
        action={buttonEnabled ? "/api/checkout_sessions" : null}
        method="POST"
      >
        <input type="hidden" value={values.crypto} name="item" />
        <input type="hidden" value={values.amount} name="amount" />
        <input type="hidden" value={values.wallet} name="wallet" />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={buttonEnabled ? false : true}
          style={buttonEnabled ? null : { opacity: 0.25 }}
        >
          Exchange
        </button>
      </form>
    </div>
  );
};

export default ExchangeBar;
