"use client";

import { useState } from "react";
import styles from "./Notifications.module.css";

interface Notification {
  id: string;
  type: "booking" | "payment" | "promo" | "system";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "booking",
      title: "Booking Confirmed",
      message:
        "Your booking at Luxury Suite has been confirmed for Dec 25-28, 2025.",
      time: "2 hours ago",
      isRead: false,
      icon: "✅",
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Successful",
      message: "Payment of $450.00 has been processed successfully.",
      time: "5 hours ago",
      isRead: false,
      icon: "💳",
    },
    {
      id: "3",
      type: "promo",
      title: "Special Offer - 30% Off",
      message: "Book now and save 30% on all premium rooms this weekend!",
      time: "1 day ago",
      isRead: true,
      icon: "🎉",
    },
    {
      id: "4",
      type: "booking",
      title: "Check-in Reminder",
      message:
        "Your check-in is tomorrow at 3:00 PM. Don't forget to bring your ID!",
      time: "1 day ago",
      isRead: true,
      icon: "🏨",
    },
    {
      id: "5",
      type: "system",
      title: "Profile Updated",
      message: "Your profile information has been updated successfully.",
      time: "2 days ago",
      isRead: true,
      icon: "⚙️",
    },
    {
      id: "6",
      type: "promo",
      title: "Loyalty Rewards",
      message: "You've earned 500 points! Redeem them on your next booking.",
      time: "3 days ago",
      isRead: true,
      icon: "🌟",
    },
  ]);

  const [filter, setFilter] = useState<
    "all" | "unread" | "booking" | "payment" | "promo"
  >("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.isRead;
    return notification.type === filter;
  });

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "booking":
        return styles.bookingType;
      case "payment":
        return styles.paymentType;
      case "promo":
        return styles.promoType;
      case "system":
        return styles.systemType;
      default:
        return "";
    }
  };

  return (
    <div className={styles.notificationsPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Notifications</h1>
            {unreadCount > 0 && (
              <span className={styles.unreadBadge}>{unreadCount} new</span>
            )}
          </div>
          <div className={styles.headerActions}>
            {unreadCount > 0 && (
              <button className={styles.markAllBtn} onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button className={styles.clearAllBtn} onClick={clearAll}>
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          <button
            className={`${styles.filterTab} ${
              filter === "all" ? styles.activeTab : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`${styles.filterTab} ${
              filter === "unread" ? styles.activeTab : ""
            }`}
            onClick={() => setFilter("unread")}
          >
            Unread
            {unreadCount > 0 && (
              <span className={styles.tabBadge}>{unreadCount}</span>
            )}
          </button>
          <button
            className={`${styles.filterTab} ${
              filter === "booking" ? styles.activeTab : ""
            }`}
            onClick={() => setFilter("booking")}
          >
            Bookings
          </button>
          <button
            className={`${styles.filterTab} ${
              filter === "payment" ? styles.activeTab : ""
            }`}
            onClick={() => setFilter("payment")}
          >
            Payments
          </button>
          <button
            className={`${styles.filterTab} ${
              filter === "promo" ? styles.activeTab : ""
            }`}
            onClick={() => setFilter("promo")}
          >
            Promotions
          </button>
        </div>

        {/* Notifications List */}
        <div className={styles.notificationsList}>
          {filteredNotifications.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔔</div>
              <h3 className={styles.emptyTitle}>No notifications</h3>
              <p className={styles.emptyText}>
                {filter === "unread"
                  ? "You're all caught up!"
                  : "You don't have any notifications yet."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationCard} ${
                  !notification.isRead ? styles.unreadCard : ""
                }`}
              >
                <div className={styles.notificationContent}>
                  <div
                    className={`${
                      styles.notificationIcon
                    } ${getNotificationColor(notification.type)}`}
                  >
                    {notification.icon}
                  </div>

                  <div className={styles.notificationBody}>
                    <div className={styles.notificationHeader}>
                      <h3 className={styles.notificationTitle}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className={styles.unreadDot}></span>
                      )}
                    </div>
                    <p className={styles.notificationMessage}>
                      {notification.message}
                    </p>
                    <span className={styles.notificationTime}>
                      {notification.time}
                    </span>
                  </div>
                </div>

                <div className={styles.notificationActions}>
                  {!notification.isRead && (
                    <button
                      className={styles.actionBtn}
                      onClick={() => markAsRead(notification.id)}
                      title="Mark as read"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    className={styles.actionBtn}
                    onClick={() => deleteNotification(notification.id)}
                    title="Delete"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
