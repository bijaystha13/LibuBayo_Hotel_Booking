import styles from "../HotelsPage.module.css";

export default function HotelLoading() {
  return (
    <div className={styles.hotelsPage}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading hotels...</p>
      </div>
    </div>
  );
}
