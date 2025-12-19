"use client";

import React, { useState } from "react";
import styles from "./AmenitiesPage.module.css";

export default function Amenities() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Amenities", icon: "⭐" },
    { id: "wellness", label: "Wellness & Spa", icon: "🧘" },
    { id: "dining", label: "Dining", icon: "🍽️" },
    { id: "recreation", label: "Recreation", icon: "🏊" },
    { id: "business", label: "Business", icon: "💼" },
    { id: "services", label: "Services", icon: "🛎️" },
  ];

  const amenities = [
    {
      id: 1,
      category: "wellness",
      title: "Luxury Spa & Wellness Center",
      description:
        "Indulge in our world-class spa featuring massage therapy, sauna, steam room, and beauty treatments.",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
      features: [
        "Hot Stone Massage",
        "Aromatherapy",
        "Facial Treatments",
        "Body Scrubs",
      ],
      hours: "6:00 AM - 10:00 PM",
      premium: true,
    },
    {
      id: 2,
      category: "dining",
      title: "Gourmet Restaurant",
      description:
        "Award-winning cuisine prepared by world-renowned chefs using locally sourced ingredients.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      features: [
        "Fine Dining",
        "Wine Cellar",
        "Chef's Table",
        "Private Dining",
      ],
      hours: "7:00 AM - 11:00 PM",
      premium: false,
    },
    {
      id: 3,
      category: "recreation",
      title: "Infinity Pool & Rooftop Bar",
      description:
        "Stunning rooftop infinity pool with panoramic city views and poolside cocktail service.",
      image:
        "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800",
      features: ["Infinity Pool", "Pool Bar", "Cabanas", "City Views"],
      hours: "24 Hours",
      premium: false,
    },
    {
      id: 4,
      category: "business",
      title: "Business Center & Meeting Rooms",
      description:
        "State-of-the-art facilities for conferences, meetings, and corporate events.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      features: [
        "High-Speed WiFi",
        "Video Conferencing",
        "Printing Services",
        "Secretarial Support",
      ],
      hours: "24 Hours",
      premium: false,
    },
    {
      id: 5,
      category: "recreation",
      title: "Fitness Center",
      description:
        "Fully equipped gym with latest cardio equipment, weights, and personal training services.",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      features: [
        "Cardio Equipment",
        "Free Weights",
        "Personal Trainer",
        "Yoga Classes",
      ],
      hours: "24 Hours",
      premium: false,
    },
    {
      id: 6,
      category: "services",
      title: "Concierge Services",
      description:
        "Our dedicated team is available to assist with reservations, tours, and special requests.",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      features: [
        "24/7 Assistance",
        "Tour Booking",
        "Transportation",
        "Restaurant Reservations",
      ],
      hours: "24 Hours",
      premium: true,
    },
    {
      id: 7,
      category: "dining",
      title: "Rooftop Lounge",
      description:
        "Sophisticated cocktail lounge with live music and spectacular sunset views.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      features: ["Craft Cocktails", "Live Music", "Tapas Menu", "Sunset Views"],
      hours: "5:00 PM - 2:00 AM",
      premium: false,
    },
    {
      id: 8,
      category: "services",
      title: "Valet & Parking",
      description:
        "Convenient valet parking service and secure underground parking facility.",
      image:
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800",
      features: ["Valet Service", "Covered Parking", "EV Charging", "Car Wash"],
      hours: "24 Hours",
      premium: false,
    },
    {
      id: 9,
      category: "wellness",
      title: "Yoga & Meditation Studio",
      description:
        "Tranquil space for yoga, meditation, and mindfulness practices with expert instructors.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
      features: [
        "Daily Classes",
        "Private Sessions",
        "Meditation Garden",
        "Wellness Programs",
      ],
      hours: "6:00 AM - 9:00 PM",
      premium: true,
    },
    {
      id: 10,
      category: "business",
      title: "Executive Lounge",
      description:
        "Exclusive lounge for business travelers with complimentary refreshments and workspaces.",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
      features: [
        "Private Workspaces",
        "Complimentary Coffee",
        "Meeting Pods",
        "Business Library",
      ],
      hours: "6:00 AM - 10:00 PM",
      premium: true,
    },
    {
      id: 11,
      category: "recreation",
      title: "Tennis Courts",
      description:
        "Professional-grade tennis courts with equipment rental and coaching available.",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800",
      features: [
        "2 Courts",
        "Night Lighting",
        "Equipment Rental",
        "Coaching Available",
      ],
      hours: "7:00 AM - 10:00 PM",
      premium: false,
    },
    {
      id: 12,
      category: "services",
      title: "Kids Club",
      description:
        "Supervised activities and entertainment for children in a safe, fun environment.",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
      features: [
        "Supervised Play",
        "Arts & Crafts",
        "Movie Room",
        "Outdoor Playground",
      ],
      hours: "9:00 AM - 8:00 PM",
      premium: false,
    },
  ];

  const filteredAmenities =
    activeCategory === "all"
      ? amenities
      : amenities.filter((amenity) => amenity.category === activeCategory);

  return (
    <div className={styles.amenitiesPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>✨</div>
          <h1 className={styles.heroTitle}>World-Class Amenities</h1>
          <p className={styles.heroSubtitle}>
            Experience luxury and comfort with our extensive range of premium
            facilities and services
          </p>
          <div className={styles.heroFeatures}>
            <div className={styles.heroFeatureItem}>
              <div className={styles.featureIcon}>🏊</div>
              <span>Pool & Spa</span>
            </div>
            <div className={styles.heroFeatureItem}>
              <div className={styles.featureIcon}>🍽️</div>
              <span>Fine Dining</span>
            </div>
            <div className={styles.heroFeatureItem}>
              <div className={styles.featureIcon}>💪</div>
              <span>Fitness Center</span>
            </div>
            <div className={styles.heroFeatureItem}>
              <div className={styles.featureIcon}>💼</div>
              <span>Business Facilities</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className={styles.categorySection}>
        <div className={styles.container}>
          <div className={styles.categoryNav}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryBtn} ${
                  activeCategory === category.id ? styles.activeCategory : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryLabel}>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className={styles.amenitiesSection}>
        <div className={styles.container}>
          <div className={styles.amenitiesGrid}>
            {filteredAmenities.map((amenity) => (
              <div key={amenity.id} className={styles.amenityCard}>
                {amenity.premium && (
                  <div className={styles.premiumBadge}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    Premium
                  </div>
                )}
                <div className={styles.amenityImageWrapper}>
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className={styles.amenityImage}
                  />
                  <div className={styles.amenityOverlay}>
                    <button className={styles.viewDetailsBtn}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                      View Details
                    </button>
                  </div>
                </div>
                <div className={styles.amenityContent}>
                  <h3 className={styles.amenityTitle}>{amenity.title}</h3>
                  <p className={styles.amenityDescription}>
                    {amenity.description}
                  </p>
                  <div className={styles.amenityFeatures}>
                    {amenity.features.map((feature, index) => (
                      <div key={index} className={styles.featureTag}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className={styles.amenityFooter}>
                    <div className={styles.amenityHours}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{amenity.hours}</span>
                    </div>
                    <button className={styles.bookAmenityBtn}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Experience Luxury?</h2>
              <p className={styles.ctaText}>
                Book your stay today and enjoy access to all our world-class
                amenities and services
              </p>
              <button className={styles.ctaBtn}>
                <span>Book Your Stay</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
            <div className={styles.ctaStats}>
              <div className={styles.ctaStat}>
                <div className={styles.ctaStatNumber}>50+</div>
                <div className={styles.ctaStatLabel}>Premium Amenities</div>
              </div>
              <div className={styles.ctaStat}>
                <div className={styles.ctaStatNumber}>24/7</div>
                <div className={styles.ctaStatLabel}>Service Available</div>
              </div>
              <div className={styles.ctaStat}>
                <div className={styles.ctaStatNumber}>5★</div>
                <div className={styles.ctaStatLabel}>Rated Facilities</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
