"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

export default function NavLinks() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? styles.activeLink : "";

  return (
    <ul className={styles.navLinks}>
      <li className={styles.navItem}>
        <Link href="/" className={`${styles.navLink} ${isActive("/")}`}>
          Home
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/hotels"
          className={`${styles.navLink} ${isActive("/hotels")}`}
        >
          Hotels
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/amenities"
          className={`${styles.navLink} ${isActive("/amenities")}`}
        >
          Amenities
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/offers"
          className={`${styles.navLink} ${isActive("/offers")}`}
        >
          Special Offers
          <span className={styles.dealsBadge}>HOT</span>
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/gallery"
          className={`${styles.navLink} ${isActive("/gallery")}`}
        >
          Gallery
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/contact"
          className={`${styles.navLink} ${isActive("/contact")}`}
        >
          Contact
        </Link>
      </li>
    </ul>
  );
}
