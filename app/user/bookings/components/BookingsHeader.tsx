import styles from "../BookingPage.module.css";

export default function BookingsHeader() {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.headerContent}>
        <h1 className={styles.pageTitle}>My Bookings</h1>
        <p className={styles.pageSubtitle}>
          Manage and view all your hotel reservations
        </p>
      </div>
      <button className={styles.newBookingBtn}>+ New Booking</button>
    </div>
  );
}
