"use client";

import React, { useState } from "react";
import styles from "./BookingPage.module.css";

interface Booking {
  id: string;
  roomName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "upcoming" | "completed" | "cancelled";
  roomEmoji: string;
  bookingDate: string;
}

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

  // Mock booking data
  const bookings: Booking[] = [
    {
      id: "BK001",
      roomName: "Royal Suite",
      roomType: "Suite",
      checkIn: "2025-01-05",
      checkOut: "2025-01-08",
      guests: 2,
      totalPrice: 899,
      status: "upcoming",
      roomEmoji: "👑",
      bookingDate: "2024-12-15",
    },
    {
      id: "BK002",
      roomName: "Ocean View Deluxe",
      roomType: "Deluxe",
      checkIn: "2024-11-20",
      checkOut: "2024-11-23",
      guests: 2,
      totalPrice: 599,
      status: "completed",
      roomEmoji: "🌊",
      bookingDate: "2024-11-10",
    },
    {
      id: "BK003",
      roomName: "Garden Villa",
      roomType: "Villa",
      checkIn: "2024-10-15",
      checkOut: "2024-10-18",
      guests: 4,
      totalPrice: 1299,
      status: "completed",
      roomEmoji: "🌺",
      bookingDate: "2024-10-01",
    },
    {
      id: "BK004",
      roomName: "Mountain Retreat",
      roomType: "Standard",
      checkIn: "2025-02-10",
      checkOut: "2025-02-13",
      guests: 2,
      totalPrice: 399,
      status: "cancelled",
      roomEmoji: "⛰️",
      bookingDate: "2024-12-01",
    },
  ];

  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return nights;
  };

  return (
    <div className={styles.bookingsPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>My Bookings</h1>
            <p className={styles.pageSubtitle}>
              Manage and view all your hotel reservations
            </p>
          </div>
          <button className={styles.newBookingBtn}>+ New Booking</button>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📅</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {bookings.filter((b) => b.status === "upcoming").length}
              </div>
              <div className={styles.statLabel}>Upcoming</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {bookings.filter((b) => b.status === "completed").length}
              </div>
              <div className={styles.statLabel}>Completed</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>❌</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {bookings.filter((b) => b.status === "cancelled").length}
              </div>
              <div className={styles.statLabel}>Cancelled</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                $
                {bookings
                  .filter((b) => b.status === "completed")
                  .reduce((sum, b) => sum + b.totalPrice, 0)}
              </div>
              <div className={styles.statLabel}>Total Spent</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
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
            <span className={styles.tabCount}>
              {bookings.filter((b) => b.status === "upcoming").length}
            </span>
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "completed" ? styles.tabActive : ""
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
            <span className={styles.tabCount}>
              {bookings.filter((b) => b.status === "completed").length}
            </span>
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "cancelled" ? styles.tabActive : ""
            }`}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled
            <span className={styles.tabCount}>
              {bookings.filter((b) => b.status === "cancelled").length}
            </span>
          </button>
        </div>

        {/* Bookings List */}
        <div className={styles.bookingsList}>
          {filteredBookings.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📭</div>
              <h3 className={styles.emptyTitle}>No bookings found</h3>
              <p className={styles.emptyText}>
                You don't have any {activeTab !== "all" ? activeTab : ""}{" "}
                bookings yet.
              </p>
              <button className={styles.emptyBtn}>Browse Hotels</button>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className={styles.bookingCard}>
                <div className={styles.bookingHeader}>
                  <div className={styles.bookingId}>Booking #{booking.id}</div>
                  <div
                    className={`${styles.statusBadge} ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </div>
                </div>

                <div className={styles.bookingContent}>
                  <div className={styles.roomImageSection}>
                    <div className={styles.roomImage}>
                      <span className={styles.roomEmoji}>
                        {booking.roomEmoji}
                      </span>
                    </div>
                  </div>

                  <div className={styles.bookingDetails}>
                    <h3 className={styles.roomName}>{booking.roomName}</h3>
                    <div className={styles.roomMeta}>
                      <span className={styles.roomType}>
                        {booking.roomType}
                      </span>
                      <span className={styles.metaDivider}>•</span>
                      <span className={styles.guestCount}>
                        {booking.guests} Guests
                      </span>
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
                        {calculateNights(booking.checkIn, booking.checkOut)}{" "}
                        nights
                      </div>
                    </div>

                    <div className={styles.bookingFooter}>
                      <div className={styles.priceSection}>
                        <span className={styles.priceLabel}>Total Price</span>
                        <span className={styles.priceAmount}>
                          ${booking.totalPrice}
                        </span>
                      </div>
                      <div className={styles.bookingActions}>
                        {booking.status === "upcoming" && (
                          <>
                            <button className={styles.btnSecondary}>
                              Modify
                            </button>
                            <button className={styles.btnDanger}>Cancel</button>
                          </>
                        )}
                        {booking.status === "completed" && (
                          <>
                            <button className={styles.btnSecondary}>
                              View Receipt
                            </button>
                            <button className={styles.btnPrimary}>
                              Book Again
                            </button>
                          </>
                        )}
                        {booking.status === "cancelled" && (
                          <button className={styles.btnPrimary}>
                            Book Again
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
