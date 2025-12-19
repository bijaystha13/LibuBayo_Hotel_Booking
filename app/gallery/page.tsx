"use client";

import React, { useState } from "react";
import styles from "./GalleryPage.module.css";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "rooms", label: "Rooms & Suites" },
    { id: "dining", label: "Dining" },
    { id: "amenities", label: "Amenities" },
    { id: "exterior", label: "Exterior" },
    { id: "events", label: "Events" },
  ];

  const galleryItems = [
    {
      id: 1,
      category: "rooms",
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      title: "Deluxe Suite",
    },
    {
      id: 2,
      category: "rooms",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      title: "Presidential Suite",
    },
    {
      id: 3,
      category: "dining",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      title: "Main Restaurant",
    },
    {
      id: 4,
      category: "amenities",
      image:
        "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800",
      title: "Infinity Pool",
    },
    {
      id: 5,
      category: "exterior",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      title: "Hotel Exterior",
    },
    {
      id: 6,
      category: "rooms",
      image:
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      title: "Ocean View Room",
    },
    {
      id: 7,
      category: "dining",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      title: "Rooftop Bar",
    },
    {
      id: 8,
      category: "amenities",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
      title: "Spa & Wellness",
    },
    {
      id: 9,
      category: "events",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f29da8c88a?w=800",
      title: "Grand Ballroom",
    },
    {
      id: 10,
      category: "exterior",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      title: "Garden View",
    },
    {
      id: 11,
      category: "amenities",
      image:
        "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=800",
      title: "Fitness Center",
    },
    {
      id: 12,
      category: "events",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      title: "Conference Room",
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className={styles.galleryPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our Gallery</h1>
          <p className={styles.heroSubtitle}>
            Explore the beauty and luxury of our hotel through stunning imagery
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.categoryFilter}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryBtn} ${
                  selectedCategory === category.id ? styles.activeCategory : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.galleryGrid}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={styles.galleryItem}
                onClick={() => setLightboxImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <div className={styles.galleryInfo}>
                    <h3 className={styles.galleryTitle}>{item.title}</h3>
                    <div className={styles.viewIcon}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div className={styles.lightbox} onClick={() => setLightboxImage(null)}>
          <button
            className={styles.lightboxClose}
            onClick={() => setLightboxImage(null)}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className={styles.lightboxImage}
            />
            <h3 className={styles.lightboxTitle}>{lightboxImage.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
