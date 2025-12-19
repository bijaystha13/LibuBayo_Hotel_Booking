import styles from "./NavBar.module.css";
import Link from "next/link";
import NavLinks from "./NavLinks.client";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <span>📞 +1 (555) 123-4567</span>
          <span>✉️ info@elitehotel.com</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={styles.mainNav}>
        <div className={styles.navContainer}>
          {/* Logo */}
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

          {/* Mobile Menu Button should be here, before NavLinks */}
          <div className={styles.mobileMenuWrapper}>
            <NavLinks />
          </div>

          <div className={styles.navRight}>
            <button className={styles.searchBtn}>🔍</button>
            <Link href="/login" className={styles.signInBtn}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
