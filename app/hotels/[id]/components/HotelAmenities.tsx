import styles from "../HotelsDetailsPage.module.css";

interface HotelAmenitiesProps {
  amenities: string[];
  className?: string;
}

export default function HotelAmenities({
  amenities,
  className = "",
}: HotelAmenitiesProps) {
  return (
    <div className={`${styles.section} ${className}`}>
      <h2 className={styles.sectionTitle}>Amenities</h2>
      <div className={styles.amenitiesGrid}>
        {amenities.map((amenity, index) => (
          <div key={index} className={styles.amenityItem}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={styles.checkIcon}
            >
              <path
                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
