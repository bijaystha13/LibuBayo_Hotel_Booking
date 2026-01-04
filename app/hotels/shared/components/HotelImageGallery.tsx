"use client";

import { useState } from "react";

import styles from "../../[id]/HotelsDetailsPage.module.css";

interface HotelImageGalleryProps {
  images: string[];
  hotelName: string;
  className?: string;
}

export default function HotelImageGallery({
  images,
  hotelName,
  className = "",
}: HotelImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`${styles.imageGallery} ${className}`}>
        <div className={styles.noImage}>
          <span className={styles.noImageEmoji}>🏨</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.imageGallery} ${className}`}>
      <div className={styles.mainImageContainer}>
        <img
          src={`http://localhost:5002/${images[currentImageIndex]}`}
          alt={hotelName}
          className={styles.mainImage}
        />

        {images.length > 1 && (
          <>
            <button
              className={`${styles.imageNavButton} ${styles.prevButton}`}
              onClick={handlePrevImage}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnailContainer}>
          {images.map((img, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${
                index === currentImageIndex ? styles.activeThumbnail : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={`http://localhost:5002/${img}`}
                alt={`${hotelName} ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
