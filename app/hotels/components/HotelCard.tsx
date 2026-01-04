"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../HotelsPage.module.css";
import { Hotel } from "../type";

interface HotelCardProps {
  hotel: Hotel;
  currentImageIndex: number;
  onNextImage: (hotelId: string, imageCount: number) => void;
  onPrevImage: (hotelId: string, imageCount: number) => void;
}

export default function HotelCard({
  hotel,
  currentImageIndex,
  onNextImage,
  onPrevImage,
}: HotelCardProps) {
  const router = useRouter();

  return (
    <div className={styles.hotelCard}>
      <div className={styles.hotelImage}>
        {hotel.image && hotel.image.length > 0 ? (
          <>
            <img
              src={`http://localhost:5002/${hotel.image[currentImageIndex]}`}
              alt={hotel.name}
              className={styles.hotelImageTag}
            />
            {hotel.image.length > 1 && (
              <div className={styles.imageControls}>
                <button
                  className={styles.imageNav}
                  onClick={() => onPrevImage(hotel._id, hotel.image.length)}
                >
                  ‹
                </button>
                <div className={styles.imageDots}>
                  {hotel.image.map((_, index) => (
                    <span
                      key={index}
                      className={`${styles.dot} ${
                        index === currentImageIndex ? styles.activeDot : ""
                      }`}
                    />
                  ))}
                </div>
                <button
                  className={styles.imageNav}
                  onClick={() => onNextImage(hotel._id, hotel.image.length)}
                >
                  ›
                </button>
              </div>
            )}
          </>
        ) : (
          <span className={styles.hotelEmoji}>🏨</span>
        )}
      </div>

      <div className={styles.hotelInfo}>
        <div className={styles.hotelHeader}>
          <div>
            <h3 className={styles.hotelName}>{hotel.name}</h3>
            <p className={styles.hotelLocation}>
              {hotel.location.city}, {hotel.location.country}
            </p>
          </div>
          <div className={styles.hotelRating}>
            <span className={styles.ratingScore}>⭐ {hotel.rating}</span>
            <span className={styles.reviewCount}>
              ({hotel.reviewsCount} reviews)
            </span>
          </div>
        </div>

        {hotel.description && (
          <p className={styles.hotelDescription}>
            {hotel.description.slice(0, 120)}...
          </p>
        )}

        <div className={styles.hotelAmenities}>
          {hotel.amenities.slice(0, 4).map((amenity, i) => (
            <span key={i} className={styles.amenityTag}>
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 4 && (
            <span className={styles.amenityTag}>
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className={styles.hotelFooter}>
          <div className={styles.hotelPrice}>
            {hotel.originalPrice && (
              <span className={styles.originalPrice}>
                ${hotel.originalPrice}
              </span>
            )}
            <div>
              <span className={styles.priceLabel}>From </span>
              <span className={styles.priceAmount}>${hotel.pricePerNight}</span>
              <span className={styles.priceUnit}> /night</span>
            </div>
          </div>
          <button
            className={styles.viewButton}
            onClick={() => router.push(`/hotels/${hotel._id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
