"use client";

import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { useHttpClient } from "../shared/hooks/httpHook";
import styles from "./HotelsPage.module.css";
import { useRouter } from "next/navigation";

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

interface HotelsResponse {
  success: boolean;
  data: Hotel[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalHotels: number;
    hotelsPerPage: number;
  };
}

export default function HotelsClient() {
  const router = useRouter();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [loadedHotels, setLoadedHotels] = useState<Hotel[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recommended");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<string, number>
  >({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalHotels, setTotalHotels] = useState(0);
  const [networkError, setNetworkError] = useState(false);
  const hotelsPerPage = 9;

  useEffect(() => {
    toast.dismiss();
  }, []);

  const filters = [
    { id: "all", label: "All Hotels", count: totalHotels },
    {
      id: "Luxury Resort",
      label: "Luxury",
      count: loadedHotels.filter((h) => h.type === "Luxury Resort").length,
    },
    {
      id: "Boutique Hotel",
      label: "Boutique",
      count: loadedHotels.filter((h) => h.type === "Boutique Hotel").length,
    },
    {
      id: "Beach Hotel",
      label: "Beach",
      count: loadedHotels.filter((h) => h.type === "Beach Hotel").length,
    },
    {
      id: "City Hotel",
      label: "City",
      count: loadedHotels.filter((h) => h.type === "City Hotel").length,
    },
  ];

  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  const fetchHotels = async () => {
    try {
      setNetworkError(false);
      const responseData = await sendRequest(
        `http://localhost:5002/api/hotels?limit=${hotelsPerPage}&page=${currentPage}`
      );

      if (responseData?.success && responseData.data) {
        setLoadedHotels(responseData.data);
        setTotalPages(responseData.pagination.totalPages);
        setTotalHotels(responseData.pagination.totalHotels);

        if (networkError) {
          toast.success("Connection restored! Hotels loaded successfully.");
        }
      }
    } catch (err: any) {
      console.error("Failed to fetch hotels:", err);

      if (
        err.isNetworkError ||
        (err.message && err.message.includes("connect"))
      ) {
        setNetworkError(true);
        toast.error(
          err.message || "Unable to connect. Please check your connection.",
          {
            autoClose: 8000,
            toastId: "hotels-network-error",
          }
        );
      } else {
        toast.error(err.message || "Failed to load hotels");
      }
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [currentPage]);

  const filteredHotels = useMemo(() => {
    const filtered = loadedHotels.filter((hotel) => {
      const matchesFilter =
        selectedFilter === "all" || hotel.type === selectedFilter;
      const matchesPrice =
        hotel.pricePerNight >= priceRange[0] &&
        hotel.pricePerNight <= priceRange[1];
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.country
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesPrice && matchesSearch;
    });

    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case "price-high":
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
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
  }, [loadedHotels, selectedFilter, priceRange, searchQuery, sortOption]);

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setIsDropdownOpen(false);
  };

  const handleNextImage = (hotelId: string, imageCount: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [hotelId]: ((prev[hotelId] || 0) + 1) % imageCount,
    }));
  };

  const handlePrevImage = (hotelId: string, imageCount: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [hotelId]: ((prev[hotelId] || 0) - 1 + imageCount) % imageCount,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = async () => {
    clearError();
    setNetworkError(false);
    toast.dismiss("hotels-network-error");
    await fetchHotels();
  };

  const selectedSortLabel = sortOptions.find(
    (opt) => opt.value === sortOption
  )?.label;

  if (isLoading && loadedHotels.length === 0) {
    return (
      <div className={styles.hotelsPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading hotels...</p>
        </div>
      </div>
    );
  }

  if (networkError || (error && error.includes("connect"))) {
    return (
      <div className={styles.hotelsPage}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>📡</div>
          <h2>Connection Error</h2>
          <p className={styles.errorMessage}>
            Unable to connect to the server. This could be due to:
          </p>

          <div className={styles.errorDetails}>
            <ul className={styles.errorList}>
              <li>No internet connection</li>
              <li>Server is temporarily unavailable</li>
              <li>Network firewall blocking the connection</li>
              <li>Server maintenance in progress</li>
            </ul>
          </div>

          <div className={styles.troubleshootBox}>
            <p className={styles.troubleshootTitle}>💡 Quick fixes:</p>
            <ul className={styles.troubleshootList}>
              <li>Check your internet connection</li>
              <li>Try refreshing the page</li>
              <li>Wait a moment and try again</li>
            </ul>
          </div>

          <div className={styles.errorActions}>
            <button onClick={handleRetry} className={styles.retryButton}>
              🔄 Retry Connection
            </button>
            <button
              onClick={() => router.push("/")}
              className={styles.backButton}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.hotelsPage}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Error Loading Hotels</h2>
          <p className={styles.errorMessage}>{error}</p>
          <div className={styles.errorActions}>
            <button onClick={handleRetry} className={styles.retryButton}>
              Try Again
            </button>
            <button
              onClick={() => router.push("/")}
              className={styles.backButton}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.hotelsPage}>
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
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

            <main className={styles.hotelsContent}>
              <div className={styles.resultsHeader}>
                <h2 className={styles.resultsTitle}>
                  {filteredHotels.length} Hotels Found
                </h2>

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
                {filteredHotels.map((hotel) => {
                  const currentIndex = currentImageIndex[hotel._id] || 0;
                  return (
                    <div key={hotel._id} className={styles.hotelCard}>
                      <div className={styles.hotelImage}>
                        {hotel.image && hotel.image.length > 0 ? (
                          <>
                            <img
                              src={`http://localhost:5002/${hotel.image[currentIndex]}`}
                              alt={hotel.name}
                              className={styles.hotelImageTag}
                            />
                            {hotel.image.length > 1 && (
                              <div className={styles.imageControls}>
                                <button
                                  className={styles.imageNav}
                                  onClick={() =>
                                    handlePrevImage(
                                      hotel._id,
                                      hotel.image.length
                                    )
                                  }
                                >
                                  ‹
                                </button>
                                <div className={styles.imageDots}>
                                  {hotel.image.map((_, index) => (
                                    <span
                                      key={index}
                                      className={`${styles.dot} ${
                                        index === currentIndex
                                          ? styles.activeDot
                                          : ""
                                      }`}
                                    />
                                  ))}
                                </div>
                                <button
                                  className={styles.imageNav}
                                  onClick={() =>
                                    handleNextImage(
                                      hotel._id,
                                      hotel.image.length
                                    )
                                  }
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
                            <span className={styles.ratingScore}>
                              ⭐ {hotel.rating}
                            </span>
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
                              <span className={styles.priceAmount}>
                                ${hotel.pricePerNight}
                              </span>
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
                })}
              </div>

              {filteredHotels.length === 0 && loadedHotels.length > 0 && (
                <div className={styles.noResults}>
                  <h3>No hotels found</h3>
                  <p>Try adjusting your filters or search query</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    className={styles.paginationButton}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M12.5 15L7.5 10L12.5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Previous
                  </button>

                  <div className={styles.paginationNumbers}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          className={`${styles.paginationNumber} ${
                            currentPage === page ? styles.activePage : ""
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    className={styles.paginationButton}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
