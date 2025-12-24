import { Booking } from "./types";
import styles from "../BookingPage.module.css";
import BookingCard from "./BookingCard";

interface BookingsListProps {
  bookings: Booking[];
  activeTab: "all" | "upcoming" | "completed" | "cancelled";
}

export default function BookingsList({
  bookings,
  activeTab,
}: BookingsListProps) {
  const filtered =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  if (filtered.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📭</div>
        <h3 className={styles.emptyTitle}>No bookings found</h3>
        <p>
          You don&apos;t have any {activeTab !== "all" ? activeTab : ""}{" "}
          bookings yet.
        </p>
        <button className={styles.emptyBtn}>Browse Hotels</button>
      </div>
    );
  }

  return (
    <div className={styles.bookingsList}>
      {filtered.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
