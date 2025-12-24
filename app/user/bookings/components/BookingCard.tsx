import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "../BookingPage.module.css";
import { Booking } from "./types";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const images =
    booking.hotelImages && booking.hotelImages.length > 0
      ? booking.hotelImages
      : [];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const calculateNights = (checkIn: string, checkOut: string) =>
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return styles.statusUpcoming;
      case "completed":
        return styles.statusCompleted;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return "";
    }
  };

  return (
    <div className={styles.bookingCard}>
      <div className={styles.bookingHeader}>
        <div className={styles.bookingId}>
          Booking #{booking.id.substring(0, 8)}...
        </div>
        <div
          className={`${styles.statusBadge} ${getStatusColor(booking.status)}`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </div>
      </div>
      <div className={styles.bookingContent}>
        <div className={styles.roomImageSection}>
          {/* <div className={styles.roomImage}>
            <span className={styles.roomEmoji}>{booking.roomEmoji}</span>
          </div> */}
          {/* <div className={styles.roomImage}>
            {booking.hotelImage ? (
              <img
                src={booking.hotelImage}
                alt={booking.roomName}
                className={styles.hotelImage}
              />
            ) : (
              <span className={styles.roomEmoji}>{booking.roomEmoji}</span>
            )}
          </div> */}

          <div className={styles.roomImage}>
            {images.length > 0 ? (
              <>
                <img
                  src={images[index]}
                  alt={booking.roomName}
                  className={styles.hotelImage}
                />

                {images.length > 1 && (
                  <>
                    <button className={styles.prevBtn} onClick={prev}>
                      <FaChevronLeft />
                    </button>

                    <button className={styles.nextBtn} onClick={next}>
                      <FaChevronRight />
                    </button>
                    {/* <button className={styles.prevBtn} onClick={prev}>
                      ‹
                    </button>
                    <button className={styles.nextBtn} onClick={next}>
                      ›
                    </button> */}
                  </>
                )}
              </>
            ) : (
              <span className={styles.roomEmoji}>{booking.roomEmoji}</span>
            )}
          </div>
        </div>
        <div className={styles.bookingDetails}>
          <h3 className={styles.roomName}>{booking.roomName}</h3>
          <div className={styles.roomMeta}>
            <span className={styles.roomType}>{booking.roomType}</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.guestCount}>{booking.guests} Guests</span>
          </div>
          <div className={styles.dateInfo}>
            <div className={styles.dateItem}>
              <div className={styles.dateLabel}>Check-in</div>
              <div className={styles.dateValue}>
                {formatDate(booking.checkIn)}
              </div>
            </div>
            <div className={styles.dateArrow}>→</div>
            <div className={styles.dateItem}>
              <div className={styles.dateLabel}>Check-out</div>
              <div className={styles.dateValue}>
                {formatDate(booking.checkOut)}
              </div>
            </div>
            <div className={styles.nightsCount}>
              {calculateNights(booking.checkIn, booking.checkOut)} nights
            </div>
          </div>
          <div className={styles.bookingFooter}>
            <div className={styles.priceSection}>
              <span className={styles.priceLabel}>Total Price</span>
              <span className={styles.priceAmount}>
                ${booking.totalPrice.toFixed(2)}
              </span>
            </div>
            <div className={styles.bookingActions}>
              {booking.status === "upcoming" && (
                <>
                  <button className={styles.btnSecondary}>Modify</button>
                  <button className={styles.btnDanger}>Cancel</button>
                </>
              )}
              {booking.status === "completed" && (
                <>
                  <button className={styles.btnSecondary}>View Receipt</button>
                  <button className={styles.btnPrimary}>Book Again</button>
                </>
              )}
              {booking.status === "cancelled" && (
                <button className={styles.btnPrimary}>Book Again</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
