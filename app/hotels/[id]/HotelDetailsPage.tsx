"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useHttpClient } from "@/app/shared/hooks/httpHook";
import styles from "./HotelsDetailsPage.module.css";
import { AuthContext } from "@/app/shared/Context/AuthContext";

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

interface PriceBreakdown {
  pricePerNight: number;
  numberOfNights: number;
  priceBeforeTax: number;
  taxPercentage: number;
  taxAmount: number;
  priceAfterTax: number;
  totalPrice: number;
}

interface HotelDetailsPageProps {
  hotelId: string;
  onBack: () => void;
}

export default function HotelDetailsPage({
  hotelId,
  onBack,
}: HotelDetailsPageProps) {
  const router = useRouter();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const authCtx = useContext(AuthContext);

  // Booking form state
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [taxPercentage, setTaxPercentage] = useState(10); // Default 10% tax
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(
    null
  );

  // Calculate estimated price breakdown before booking
  const calculateEstimatedPrice = () => {
    if (!hotel || !checkInDate || !checkOutDate) return null;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) return null;

    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );

    const priceBeforeTax = hotel.pricePerNight * nights;
    const taxAmount = (priceBeforeTax * taxPercentage) / 100;
    const priceAfterTax = priceBeforeTax + taxAmount;

    return {
      pricePerNight: hotel.pricePerNight,
      numberOfNights: nights,
      priceBeforeTax,
      taxPercentage,
      taxAmount,
      priceAfterTax,
    };
  };

  const estimatedPrice = calculateEstimatedPrice();

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

  const handleBooking = async () => {
    // Basic validation
    if (!checkInDate || !checkOutDate) {
      setBookingError("Please select check-in and check-out dates");
      return;
    }

    if (!hotel) {
      setBookingError("Hotel information not available");
      return;
    }

    if (!authCtx.userId) {
      setBookingError("Please log in to book a hotel");
      return;
    }

    const userId = authCtx.userId;

    setBookingLoading(true);
    setBookingError(null);
    setBookingSuccess(false);
    setPriceBreakdown(null);

    try {
      const bookingData = {
        user: userId,
        hotel: hotel._id,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: guests,
        tax: taxPercentage,
      };

      console.log("Sending booking data:", bookingData);

      const responseData = await sendRequest(
        "http://localhost:5002/api/booking",
        "POST",
        JSON.stringify(bookingData),
        {
          "Content-Type": "application/json",
        }
      );

      console.log("Response:", responseData);

      if (responseData?.booking && responseData?.priceBreakdown) {
        setBookingSuccess(true);
        setPriceBreakdown(responseData.priceBreakdown);
        console.log("Booking created:", responseData.booking);
        console.log("Price breakdown:", responseData.priceBreakdown);

        // Navigate to bookings page after 2 seconds
        setTimeout(() => {
          router.push("/user/bookings");
        }, 1000);
      }
    } catch (err) {
      console.error("Booking error:", err);
      if (err instanceof Error) {
        setBookingError(err.message);
      } else {
        setBookingError("Failed to create booking. Please try again.");
      }
    } finally {
      setBookingLoading(false);
    }
  };

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
          <p>The hotel you&apos;re looking for doesn&apos;t exist.</p>
          <button onClick={onBack} className={styles.errorButton}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailsPage}>
      {/* Full-Screen Redirecting Overlay */}
      {redirecting && (
        <div className={styles.fullScreenOverlay}>
          <div className={styles.overlayContent}>
            <div className={styles.largeSpinner}></div>
            <h2 className={styles.overlayTitle}>Booking Confirmed!</h2>
            <p className={styles.overlayText}>
              Redirecting to your bookings...
            </p>
          </div>
        </div>
      )}

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

              {/* Booking Success Message with Price Breakdown */}
              {bookingSuccess && priceBreakdown && (
                <div className={styles.successMessage}>
                  {!redirecting ? (
                    <>
                      <div className={styles.successHeader}>
                        ✅ Booking created successfully!
                      </div>
                      <div className={styles.priceBreakdownCard}>
                        <h3 className={styles.breakdownTitle}>
                          Price Breakdown
                        </h3>
                        <div className={styles.breakdownItems}>
                          <div className={styles.breakdownItem}>
                            <span>Price per night:</span>
                            <span>
                              ${priceBreakdown.pricePerNight.toFixed(2)}
                            </span>
                          </div>
                          <div className={styles.breakdownItem}>
                            <span>Number of nights:</span>
                            <span>{priceBreakdown.numberOfNights}</span>
                          </div>
                          <div className={styles.breakdownItem}>
                            <span>Subtotal (before tax):</span>
                            <span className={styles.subtotal}>
                              ${priceBreakdown.priceBeforeTax.toFixed(2)}
                            </span>
                          </div>
                          <div className={styles.breakdownItem}>
                            <span>Tax ({priceBreakdown.taxPercentage}%):</span>
                            <span>+${priceBreakdown.taxAmount.toFixed(2)}</span>
                          </div>
                          <div className={styles.breakdownDivider}></div>
                          <div
                            className={`${styles.breakdownItem} ${styles.totalRow}`}
                          >
                            <span>Total (after tax):</span>
                            <span className={styles.totalPrice}>
                              ${priceBreakdown.priceAfterTax.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={styles.redirectingContainer}>
                      <div className={styles.redirectSpinner}></div>
                      <div className={styles.redirectText}>
                        Redirecting to your bookings...
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Booking Error Message */}
              {bookingError && (
                <div className={styles.errorMessage}>❌ {bookingError}</div>
              )}

              <div className={styles.bookingForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Check-in</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    min={new Date().toISOString().split("T")[0]}
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Check-out</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    min={new Date().toISOString().split("T")[0]}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Guests</label>
                  <select
                    className={styles.formInput}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Tax Percentage (%)</label>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={taxPercentage}
                    onChange={(e) =>
                      setTaxPercentage(
                        Math.max(
                          0,
                          Math.min(100, parseInt(e.target.value) || 0)
                        )
                      )
                    }
                    min="0"
                    max="100"
                    step="1"
                  />
                </div>

                {/* Estimated Price Breakdown */}
                {estimatedPrice && (
                  <div className={styles.estimatedPriceCard}>
                    <h4 className={styles.estimatedTitle}>Estimated Price</h4>
                    <div className={styles.estimatedItems}>
                      <div className={styles.estimatedItem}>
                        <span>
                          ${estimatedPrice.pricePerNight.toFixed(2)} ×{" "}
                          {estimatedPrice.numberOfNights} nights
                        </span>
                        <span>${estimatedPrice.priceBeforeTax.toFixed(2)}</span>
                      </div>
                      <div className={styles.estimatedItem}>
                        <span>Tax ({estimatedPrice.taxPercentage}%)</span>
                        <span>${estimatedPrice.taxAmount.toFixed(2)}</span>
                      </div>
                      <div className={styles.estimatedDivider}></div>
                      <div
                        className={`${styles.estimatedItem} ${styles.estimatedTotal}`}
                      >
                        <span>Total</span>
                        <span>${estimatedPrice.priceAfterTax.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  className={styles.bookButton}
                  onClick={handleBooking}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Processing..." : "Book Now"}
                </button>

                <div className={styles.bookingNote}>
                  You won&apos;t be charged yet
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
