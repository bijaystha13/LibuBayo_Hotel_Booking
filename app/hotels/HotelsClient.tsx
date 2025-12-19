"use client";

import { useState, useMemo } from "react";
import styles from "./HotelsPage.module.css";

export default function HotelsClient() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recommended");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filters = [
    { id: "all", label: "All Hotels", count: 24 },
    { id: "luxury", label: "Luxury", count: 8 },
    { id: "boutique", label: "Boutique", count: 6 },
    { id: "resort", label: "Resort", count: 10 },
  ];

  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  const hotels = [
    {
      id: 1,
      name: "Grand Oceanic Resort",
      location: "Maldives",
      category: "luxury",
      rating: 4.9,
      reviews: 328,
      price: 450,
      image: "🏝️",
      amenities: ["Ocean View", "Private Beach", "Spa", "Pool"],
      description: "Luxury overwater villas with stunning ocean views",
    },
    {
      id: 2,
      name: "Mountain Peak Lodge",
      location: "Swiss Alps",
      category: "resort",
      rating: 4.8,
      reviews: 256,
      price: 380,
      image: "🏔️",
      amenities: ["Mountain View", "Ski Access", "Restaurant", "Spa"],
      description: "Alpine luxury resort with panoramic mountain views",
    },
    {
      id: 3,
      name: "Urban Chic Hotel",
      location: "New York City",
      category: "boutique",
      rating: 4.7,
      reviews: 412,
      price: 320,
      image: "🏙️",
      amenities: ["City View", "Rooftop Bar", "Gym", "Restaurant"],
      description: "Modern boutique hotel in the heart of Manhattan",
    },
    {
      id: 4,
      name: "Desert Oasis Resort",
      location: "Dubai",
      category: "luxury",
      rating: 4.9,
      reviews: 289,
      price: 520,
      image: "🏜️",
      amenities: ["Desert View", "Infinity Pool", "Spa", "Golf"],
      description: "Ultra-luxury resort in the Arabian desert",
    },
    {
      id: 5,
      name: "Tropical Paradise Hotel",
      location: "Bali",
      category: "resort",
      rating: 4.8,
      reviews: 367,
      price: 280,
      image: "🌴",
      amenities: ["Garden View", "Pool", "Spa", "Beach Access"],
      description: "Serene tropical resort surrounded by rice paddies",
    },
    {
      id: 6,
      name: "Historic Manor House",
      location: "Cotswolds, UK",
      category: "boutique",
      rating: 4.6,
      reviews: 198,
      price: 240,
      image: "🏰",
      amenities: ["Garden View", "Restaurant", "Bar", "Library"],
      description: "Charming historic property with English countryside views",
    },
    {
      id: 7,
      name: "Beachfront Paradise",
      location: "Caribbean",
      category: "luxury",
      rating: 4.9,
      reviews: 445,
      price: 480,
      image: "🏖️",
      amenities: ["Beach View", "Water Sports", "Spa", "Pool"],
      description: "Exclusive beachfront resort with crystal-clear waters",
    },
    {
      id: 8,
      name: "City Lights Boutique",
      location: "Tokyo",
      category: "boutique",
      rating: 4.7,
      reviews: 334,
      price: 290,
      image: "🌆",
      amenities: ["City View", "Rooftop", "Restaurant", "Bar"],
      description: "Contemporary design hotel in vibrant Shibuya",
    },
    {
      id: 9,
      name: "Vineyard Estate Hotel",
      location: "Tuscany",
      category: "resort",
      rating: 4.8,
      reviews: 276,
      price: 350,
      image: "🍇",
      amenities: ["Vineyard View", "Wine Tasting", "Pool", "Restaurant"],
      description: "Elegant estate hotel among rolling vineyards",
    },
  ];

  // Filter hotels based on selected criteria
  const filteredHotels = useMemo(() => {
    const filtered = hotels.filter((hotel) => {
      const matchesFilter =
        selectedFilter === "all" || hotel.category === selectedFilter;
      const matchesPrice =
        hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesPrice && matchesSearch;
    });

    // Sort based on selected option
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "recommended":
      default:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [selectedFilter, priceRange, searchQuery, sortOption]);

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setIsDropdownOpen(false);
  };

  const selectedSortLabel = sortOptions.find(
    (opt) => opt.value === sortOption
  )?.label;

  return (
    <div className={styles.hotelsPage}>
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            {/* Sidebar Filters */}
            <aside className={styles.sidebar}>
              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Search</h3>
                <input
                  type="text"
                  placeholder="Search hotels or location..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Categories</h3>
                <div className={styles.filterOptions}>
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      className={`${styles.filterButton} ${
                        selectedFilter === filter.id ? styles.activeFilter : ""
                      }`}
                      onClick={() => setSelectedFilter(filter.id)}
                    >
                      <span>{filter.label}</span>
                      <span className={styles.filterCount}>{filter.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Price Range</h3>
                <div className={styles.priceRange}>
                  <div className={styles.priceLabels}>
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([0, parseInt(e.target.value)])
                    }
                    className={styles.rangeSlider}
                  />
                </div>
              </div>
            </aside>

            {/* Hotels Grid */}
            <main className={styles.hotelsContent}>
              <div className={styles.resultsHeader}>
                <h2 className={styles.resultsTitle}>
                  {filteredHotels.length} Hotels Found
                </h2>

                {/* Custom Animated Dropdown */}
                <div className={styles.customDropdown}>
                  <button
                    className={styles.dropdownButton}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>{selectedSortLabel}</span>
                    <svg
                      className={`${styles.dropdownArrow} ${
                        isDropdownOpen ? styles.dropdownArrowOpen : ""
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      {sortOptions.map((option, index) => (
                        <button
                          key={option.value}
                          className={`${styles.dropdownItem} ${
                            sortOption === option.value
                              ? styles.dropdownItemActive
                              : ""
                          }`}
                          onClick={() => handleSortChange(option.value)}
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          <span>{option.label}</span>
                          {sortOption === option.value && (
                            <svg
                              className={styles.checkIcon}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M13.3333 4L6 11.3333L2.66667 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.hotelsGrid}>
                {filteredHotels.map((hotel) => (
                  <div key={hotel.id} className={styles.hotelCard}>
                    <div className={styles.hotelImage}>
                      <span className={styles.hotelEmoji}>{hotel.image}</span>
                      <div className={styles.hotelBadge}>
                        {hotel.category.charAt(0).toUpperCase() +
                          hotel.category.slice(1)}
                      </div>
                    </div>

                    <div className={styles.hotelInfo}>
                      <div className={styles.hotelHeader}>
                        <div>
                          <h3 className={styles.hotelName}>{hotel.name}</h3>
                          <p className={styles.hotelLocation}>
                            {hotel.location}
                          </p>
                        </div>
                        <div className={styles.hotelRating}>
                          <span className={styles.ratingScore}>
                            {hotel.rating}
                          </span>
                          <span className={styles.reviewCount}>
                            ({hotel.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      <p className={styles.hotelDescription}>
                        {hotel.description}
                      </p>

                      <div className={styles.hotelAmenities}>
                        {hotel.amenities.map((amenity, i) => (
                          <span key={i} className={styles.amenityTag}>
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className={styles.hotelFooter}>
                        <div className={styles.hotelPrice}>
                          <span className={styles.priceLabel}>From</span>
                          <span className={styles.priceAmount}>
                            ${hotel.price}
                          </span>
                          <span className={styles.priceUnit}>per night</span>
                        </div>
                        <button className={styles.viewButton}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
