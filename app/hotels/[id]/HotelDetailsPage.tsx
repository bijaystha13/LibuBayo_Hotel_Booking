"use client";

import { useState, useEffect } from "react";
import { useHttpClient } from "@/app/shared/hooks/httpHook";
import styles from "./HotelsDetailsPage.module.css";

interface Hotel {
  _id: string;
  name: string;
  type: string;
  location: {
    city: string;
    country: string;
  };
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  originalPrice?: number;
  amenities: string[];
  featured: boolean;
  image: string[];
  distance?: string;
  description?: string;
}

interface HotelDetailsPageProps {
  hotelId: string;
  onBack: () => void;
}

export default function HotelDetailsPage({
  hotelId,
  onBack,
}: HotelDetailsPageProps) {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedAmenityTab, setSelectedAmenityTab] = useState("all");

  useEffect(() => {
    async function fetchHotelDetails() {
      try {
        const responseData = await sendRequest(
          `http://localhost:5002/api/hotels/${hotelId}`
        );

        if (responseData?.success && responseData.data) {
          setHotel(responseData.data);
        }
      } catch (err) {
        console.error("Failed to fetch hotel details:", err);
      }
    }
    fetchHotelDetails();
  }, [hotelId, sendRequest]);

  const handleNextImage = () => {
    if (hotel && hotel.image.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % hotel.image.length);
    }
  };

  const handlePrevImage = () => {
    if (hotel && hotel.image.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + hotel.image.length) % hotel.image.length
      );
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (isLoading && !hotel) {
    return (
      <div className={styles.detailsPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.detailsPage}>
        <div className={styles.errorContainer}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={clearError} className={styles.errorButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className={styles.detailsPage}>
        <div className={styles.errorContainer}>
          <h2>Hotel Not Found</h2>
          <p>The hotel you're looking for doesn't exist.</p>
          <button onClick={onBack} className={styles.errorButton}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailsPage}>
      <div className={styles.container}>
        {/* Back Button */}
        <button onClick={onBack} className={styles.backButton}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Hotels
        </button>

        {/* Hotel Header */}
        <div className={styles.hotelHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.hotelName}>{hotel.name}</h1>
            <div className={styles.locationInfo}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 14.6667C10.6667 12 13.3333 9.61217 13.3333 6.66667C13.3333 3.72115 10.9455 1.33333 8 1.33333C5.05448 1.33333 2.66667 3.72115 2.66667 6.66667C2.66667 9.61217 5.33333 12 8 14.6667Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                {hotel.location.city}, {hotel.location.country}
              </span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.ratingBadge}>
              <span className={styles.ratingScore}>⭐ {hotel.rating}</span>
              <span className={styles.ratingLabel}>Excellent</span>
            </div>
            <div className={styles.reviewCount}>
              {hotel.reviewsCount} reviews
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className={styles.imageGallery}>
          <div className={styles.mainImageContainer}>
            {hotel.image && hotel.image.length > 0 ? (
              <>
                <img
                  src={`http://localhost:5002/${hotel.image[currentImageIndex]}`}
                  alt={hotel.name}
                  className={styles.mainImage}
                />
                {hotel.image.length > 1 && (
                  <>
                    <button
                      className={`${styles.imageNavButton} ${styles.prevButton}`}
                      onClick={handlePrevImage}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M15 18L9 12L15 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      className={`${styles.imageNavButton} ${styles.nextButton}`}
                      onClick={handleNextImage}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div className={styles.imageCounter}>
                      {currentImageIndex + 1} / {hotel.image.length}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className={styles.noImage}>
                <span className={styles.noImageEmoji}>🏨</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {hotel.image && hotel.image.length > 1 && (
            <div className={styles.thumbnailContainer}>
              {hotel.image.map((img, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${
                    index === currentImageIndex ? styles.activeThumbnail : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={`http://localhost:5002/${img}`}
                    alt={`${hotel.name} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Left Column - Details */}
          <div className={styles.leftColumn}>
            {/* Type Badge */}
            <div className={styles.typeBadge}>{hotel.type}</div>

            {/* Description */}
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

            {/* Amenities */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Amenities</h2>
              <div className={styles.amenitiesGrid}>
                {hotel.amenities.map((amenity, index) => (
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

            {/* Location */}
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
                  {hotel.distance && (
                    <p className={styles.distance}>
                      {hotel.distance} from center
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className={styles.rightColumn}>
            <div className={styles.bookingCard}>
              <div className={styles.priceSection}>
                {hotel.originalPrice && (
                  <div className={styles.originalPrice}>
                    ${hotel.originalPrice}
                  </div>
                )}
                <div className={styles.currentPrice}>
                  <span className={styles.priceAmount}>
                    ${hotel.pricePerNight}
                  </span>
                  <span className={styles.priceUnit}> / night</span>
                </div>
                <div className={styles.savingsInfo}>
                  {hotel.originalPrice && (
                    <span className={styles.savings}>
                      Save ${hotel.originalPrice - hotel.pricePerNight}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.bookingForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Check-in</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Check-out</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Guests</label>
                  <select className={styles.formInput}>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>

                <button className={styles.bookButton}>Book Now</button>

                <div className={styles.bookingNote}>
                  You won't be charged yet
                </div>
              </div>

              <div className={styles.highlights}>
                <div className={styles.highlightItem}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16.6667 5L7.50004 14.1667L3.33337 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Free cancellation</span>
                </div>
                <div className={styles.highlightItem}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16.6667 5L7.50004 14.1667L3.33337 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>No prepayment needed</span>
                </div>
                <div className={styles.highlightItem}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16.6667 5L7.50004 14.1667L3.33337 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Instant confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
