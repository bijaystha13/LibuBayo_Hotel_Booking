import styles from "../BookingPage.module.css";
import { Booking } from "./types";

interface BookingsStatsProps {
  bookings: Booking[];
}

export default function BookingsStats({ bookings }: BookingsStatsProps) {
  const upcoming = bookings.filter((b) => b.status === "upcoming").length;
  const completed = bookings.filter((b) => b.status === "completed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const totalSpent = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>📅</div>
        <div className={styles.statContent}>
          <div className={styles.statValue}>{upcoming}</div>
          <div className={styles.statLabel}>Upcoming</div>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>✅</div>
        <div className={styles.statContent}>
          <div className={styles.statValue}>{completed}</div>
          <div className={styles.statLabel}>Completed</div>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>❌</div>
        <div className={styles.statContent}>
          <div className={styles.statValue}>{cancelled}</div>
          <div className={styles.statLabel}>Cancelled</div>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>💰</div>
        <div className={styles.statContent}>
          <div className={styles.statValue}>${totalSpent}</div>
          <div className={styles.statLabel}>Total Spent</div>
        </div>
      </div>
    </div>
  );
}
