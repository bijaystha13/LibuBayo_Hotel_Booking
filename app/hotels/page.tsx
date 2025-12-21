import HotelsClient from "./HotelsClient";
import styles from "./HotelsPage.module.css";

export default function HotelsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Your Perfect Stay</h1>
          <p className={styles.heroDescription}>
            Explore our curated collection of luxury hotels and resorts
            worldwide
          </p>
        </div>
      </section>

      <HotelsClient />
    </>
  );
}
