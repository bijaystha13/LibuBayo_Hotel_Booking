import styles from "../HotelsDetailsPage.module.css";

interface HotelInfoProps {
  hotel: {
    name: string;
    type: string;
    location: {
      city: string;
      country: string;
    };
    rating: number;
    reviewsCount: number;
    description?: string;
  };
}

export default function HotelInfo({ hotel }: HotelInfoProps) {
  return (
    <div className={styles.contentGrid}>
      <div className={styles.leftColumn}>
        <div className={styles.typeBadge}>{hotel.type}</div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>About this hotel</h2>
          <p className={styles.description}>
            {hotel.description ||
              `Experience luxury and comfort at ${
                hotel.name
              }. Located in the heart of ${
                hotel.location.city
              }, this ${hotel.type.toLowerCase()} offers world-class amenities and exceptional service to make your stay unforgettable.`}
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Location</h2>
          <div className={styles.locationCard}>
            <div className={styles.locationIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className={styles.locationName}>
                {hotel.location.city}, {hotel.location.country}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
