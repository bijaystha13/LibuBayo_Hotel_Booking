"use client";

import { useRouter } from "next/navigation";
import styles from "../HotelsPage.module.css";

interface HotelErrorProps {
  error: string;
  networkError?: boolean;
  onRetry: () => void;
}

export default function HotelError({
  error,
  networkError = false,
  onRetry,
}: HotelErrorProps) {
  const router = useRouter();

  if (networkError || error.includes("connect")) {
    return (
      <div className={styles.hotelsPage}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>📡</div>
          <h2>Connection Error</h2>
          <p className={styles.errorMessage}>
            Unable to connect to the server. This could be due to:
          </p>

          <div className={styles.errorDetails}>
            <ul className={styles.errorList}>
              <li>No internet connection</li>
              <li>Server is temporarily unavailable</li>
              <li>Network firewall blocking the connection</li>
              <li>Server maintenance in progress</li>
            </ul>
          </div>

          <div className={styles.troubleshootBox}>
            <p className={styles.troubleshootTitle}>💡 Quick fixes:</p>
            <ul className={styles.troubleshootList}>
              <li>Check your internet connection</li>
              <li>Try refreshing the page</li>
              <li>Wait a moment and try again</li>
            </ul>
          </div>

          <div className={styles.errorActions}>
            <button onClick={onRetry} className={styles.retryButton}>
              🔄 Retry Connection
            </button>
            <button
              onClick={() => router.push("/")}
              className={styles.backButton}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.hotelsPage}>
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2>Error Loading Hotels</h2>
        <p className={styles.errorMessage}>{error}</p>
        <div className={styles.errorActions}>
          <button onClick={onRetry} className={styles.retryButton}>
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className={styles.backButton}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
