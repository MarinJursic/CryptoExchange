import styles from "../styles/Navbar.module.scss";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo} />
        <h2 className={styles.name}>KepBit</h2>
      </div>
      <div className={styles.navigation}>
        <ul>
          <a href="#Process">
            <li>How It Works</li>
          </a>
          <a href="#About">
            <li>Contact Us</li>
          </a>
          <a href="#FAQ">
            <li>FAQ</li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
