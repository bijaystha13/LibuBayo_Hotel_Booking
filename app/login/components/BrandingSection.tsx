import React from "react";
import styles from "../LoginPage.module.css";

export default function BrandingSection() {
  return (
    <div className={styles.brandingSection}>
      <div className={styles.logoSection}>
        <span className={styles.logoIcon}>🏨</span>
        <div className={styles.logoText}>
          <h1 className={styles.brandName}>LuxeStay</h1>
          <p className={styles.brandTagline}>Discover Your Perfect Stay</p>
        </div>
      </div>

      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🌟</span>
          <h3>Premium Hotels</h3>
          <p>Access to luxury accommodations worldwide</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>💰</span>
          <h3>Best Prices</h3>
          <p>Guaranteed lowest rates for your bookings</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🔒</span>
          <h3>Secure Booking</h3>
          <p>Your information is safe and encrypted</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>⚡</span>
          <h3>Instant Confirmation</h3>
          <p>Get booking confirmations immediately</p>
        </div>
      </div>
    </div>
  );
}
