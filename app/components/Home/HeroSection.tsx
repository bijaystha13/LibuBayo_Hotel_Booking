"use client";

import { useState, useEffect } from "react";
import styles from "../.././HomePage.module.css";

export default function HeroSection() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    console.log({ checkIn, checkOut, guests });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div
        className={styles.heroContent}
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className={styles.heroText}>
          <span className={styles.heroSubtitle}>
            Welcome to LinuBayo Elite Resort
          </span>
          <h1 className={styles.heroTitle}>
            Experience Luxury
            <br />
            Beyond Imagination
          </h1>
          <p className={styles.heroDescription}>
            Discover world-class hospitality in the heart of paradise. Your
            dream vacation starts here.
          </p>
        </div>

        {/* Search Box */}
        <div className={styles.searchBox}>
          <div className={styles.searchGrid}>
            <div className={styles.searchField}>
              <label className={styles.searchLabel}>Check In</label>
              <input
                type="date"
                className={styles.searchInput}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className={styles.searchField}>
              <label className={styles.searchLabel}>Check Out</label>
              <input
                type="date"
                className={styles.searchInput}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className={styles.searchField}>
              <label className={styles.searchLabel}>Guests</label>
              <select
                className={styles.searchInput}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5+ Guests</option>
              </select>
            </div>
            <button onClick={handleSearch} className={styles.searchButton}>
              Search Availability
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </section>
  );
}
