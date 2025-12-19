"use client";

import React, { useState } from "react";
import styles from "./SpecialOffersPage.module.css";

export default function SpecialOffers() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Offers" },
    { id: "seasonal", label: "Seasonal" },
    { id: "weekend", label: "Weekend Deals" },
    { id: "longstay", label: "Long Stay" },
    { id: "lastminute", label: "Last Minute" },
  ];

  const offers = [
    {
      id: 1,
      category: "seasonal",
      title: "Winter Wonderland Package",
      discount: "40% OFF",
      description:
        "Enjoy cozy winter nights with complimentary spa access, hot chocolate by the fireplace, and late checkout.",
      validUntil: "Valid until March 31, 2025",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      badge: "Popular",
      features: ["Free Spa Access", "Late Checkout", "Complimentary Breakfast"],
    },
    {
      id: 2,
      category: "weekend",
      title: "Weekend Escape",
      discount: "35% OFF",
      description:
        "Perfect for a quick getaway. Book Friday to Sunday and save big on your weekend retreat.",
      validUntil: "Valid every weekend",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      badge: "Hot Deal",
      features: ["Room Upgrade", "Free Parking", "Welcome Drink"],
    },
    {
      id: 3,
      category: "longstay",
      title: "Extended Stay Special",
      discount: "50% OFF",
      description:
        "Stay 7 nights or more and enjoy incredible savings with full access to all hotel amenities.",
      validUntil: "Valid until June 30, 2025",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      badge: "Best Value",
      features: ["Kitchenette Access", "Free Laundry", "Airport Transfer"],
    },
    {
      id: 4,
      category: "lastminute",
      title: "Last Minute Luxury",
      discount: "45% OFF",
      description:
        "Book within 24 hours of arrival and unlock exclusive rates on premium suites.",
      validUntil: "Book 24hrs before arrival",
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      badge: "Limited Time",
      features: ["Suite Upgrade", "Express Check-in", "Minibar Included"],
    },
    {
      id: 5,
      category: "seasonal",
      title: "Spring Bloom Special",
      discount: "30% OFF",
      description:
        "Celebrate spring with garden view rooms, outdoor dining experiences, and nature walks.",
      validUntil: "Valid until May 31, 2025",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      badge: "New",
      features: ["Garden View", "Outdoor Dining", "Bike Rental"],
    },
    {
      id: 6,
      category: "weekend",
      title: "Romantic Weekend",
      discount: "38% OFF",
      description:
        "Couples special with champagne, rose petals, couples massage, and candlelit dinner.",
      validUntil: "Valid Fri-Sun",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      badge: "Romantic",
      features: ["Champagne", "Couples Massage", "Candlelit Dinner"],
    },
  ];

  const filteredOffers =
    selectedFilter === "all"
      ? offers
      : offers.filter((offer) => offer.category === selectedFilter);

  return (
    <div className={styles.offersPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>Exclusive Deals</span>
          </div>
          <h1 className={styles.heroTitle}>Special Offers</h1>
          <p className={styles.heroSubtitle}>
            Discover amazing deals and exclusive packages for your perfect stay
          </p>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Active Offers</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>Up to 50%</div>
              <div className={styles.statLabel}>Savings</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filterWrapper}>
            <div className={styles.filterLabel}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span>Filter by:</span>
            </div>
            <div className={styles.filterButtons}>
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`${styles.filterBtn} ${
                    selectedFilter === filter.id ? styles.activeFilter : ""
                  }`}
                  onClick={() => setSelectedFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className={styles.offersSection}>
        <div className={styles.container}>
          <div className={styles.offersGrid}>
            {filteredOffers.map((offer) => (
              <div key={offer.id} className={styles.offerCard}>
                <div className={styles.offerImageWrapper}>
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className={styles.offerImage}
                  />
                  <div className={styles.offerBadge}>{offer.badge}</div>
                  <div className={styles.offerDiscount}>{offer.discount}</div>
                </div>
                <div className={styles.offerContent}>
                  <h3 className={styles.offerTitle}>{offer.title}</h3>
                  <p className={styles.offerDescription}>{offer.description}</p>
                  <div className={styles.offerFeatures}>
                    {offer.features.map((feature, index) => (
                      <div key={index} className={styles.featureItem}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.offerFooter}>
                    <div className={styles.offerValidity}>
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
                      <span>{offer.validUntil}</span>
                    </div>
                    <button className={styles.bookBtn}>
                      Book Now
                      <svg
                        width="16"
                        height="16"
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className={styles.container}>
          <div className={styles.newsletterCard}>
            <div className={styles.newsletterContent}>
              <h2 className={styles.newsletterTitle}>Never Miss a Deal</h2>
              <p className={styles.newsletterText}>
                Subscribe to our newsletter and be the first to know about
                exclusive offers and special promotions
              </p>
            </div>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterBtn}>
                Subscribe
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
