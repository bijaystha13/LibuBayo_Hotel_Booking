import styles from "./NavBar.module.css";
import Link from "next/link";
import NavLinks from "./NavLinks.client";
import AuthButton from "./AuthButton";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <span>📞 +1 (555) 123-4567</span>
          <span>✉️ info@elitehotel.com</span>
        </div>
      </div>

      <div className={styles.mainNav}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🏨</span>
            <div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>LinuBayo Elite Hotel</span>
                <span className={styles.logoTagline}>
                  Premium Hotels & Resorts
                </span>
              </div>
            </div>
          </Link>

          <div className={styles.mobileMenuWrapper}>
            <NavLinks />
          </div>

          <div className={styles.navRight}>
            {/* <button className={styles.searchBtn}>🔍</button> */}
            {/* <AuthButton /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
