import styles from "../BookingPage.module.css";
import { Booking } from "./types";

interface BookingsTabsProps {
  bookings: Booking[];
  activeTab: "all" | "upcoming" | "completed" | "cancelled";
  setActiveTab: (tab: "all" | "upcoming" | "completed" | "cancelled") => void;
}

export default function BookingsTabs({
  bookings,
  activeTab,
  setActiveTab,
}: BookingsTabsProps) {
  const count = (status: "upcoming" | "completed" | "cancelled") =>
    bookings.filter((b) => b.status === status).length;

  return (
    <div className={styles.tabsContainer}>
      <button
        className={`${styles.tab} ${
          activeTab === "all" ? styles.tabActive : ""
        }`}
        onClick={() => setActiveTab("all")}
      >
        All Bookings
        <span className={styles.tabCount}>{bookings.length}</span>
      </button>
      <button
        className={`${styles.tab} ${
          activeTab === "upcoming" ? styles.tabActive : ""
        }`}
        onClick={() => setActiveTab("upcoming")}
      >
        Upcoming
        <span className={styles.tabCount}>{count("upcoming")}</span>
      </button>
      <button
        className={`${styles.tab} ${
          activeTab === "completed" ? styles.tabActive : ""
        }`}
        onClick={() => setActiveTab("completed")}
      >
        Completed
        <span className={styles.tabCount}>{count("completed")}</span>
      </button>
      <button
        className={`${styles.tab} ${
          activeTab === "cancelled" ? styles.tabActive : ""
        }`}
        onClick={() => setActiveTab("cancelled")}
      >
        Cancelled
        <span className={styles.tabCount}>{count("cancelled")}</span>
      </button>
    </div>
  );
}
