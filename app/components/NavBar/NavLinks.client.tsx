"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import Link from "next/link";

export default function NavLinks() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path ? styles.activeLink : "";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMobileMenuOpen(false);
    }, 0);

    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${mobileMenuOpen ? styles.active : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`${styles.navCenter} ${
          mobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <Link
              href="/"
              className={`${styles.navLink} ${isActive("/")}`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/hotels"
              className={`${styles.navLink} ${isActive("/hotels")}`}
              onClick={handleLinkClick}
            >
              Hotels
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/amenities"
              className={`${styles.navLink} ${isActive("/amenities")}`}
              onClick={handleLinkClick}
            >
              Amenities
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/specialoffers"
              className={`${styles.navLink} ${isActive("/specialoffers")}`}
              onClick={handleLinkClick}
            >
              Special Offers
              <span className={styles.dealsBadge}>HOT</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/gallery"
              className={`${styles.navLink} ${isActive("/gallery")}`}
              onClick={handleLinkClick}
            >
              Gallery
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/contact"
              className={`${styles.navLink} ${isActive("/contact")}`}
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </li>

          <li className={`${styles.navItem} ${styles.mobileOnly}`}>
            <Link
              href="/login"
              className={styles.mobileLoginBtn}
              onClick={handleLinkClick}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>

      <button
        className={`${styles.mobileMenuBtn} ${
          mobileMenuOpen ? styles.menuOpen : ""
        }`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          className={styles.menuIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
            strokeWidth="2"
            className={styles.line1}
          />
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            strokeWidth="2"
            className={styles.line2}
          />
          <line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
            strokeWidth="2"
            className={styles.line3}
          />
        </svg>
      </button>
    </>
  );
}
