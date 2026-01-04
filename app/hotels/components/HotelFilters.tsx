"use client";

import styles from "../HotelsPage.module.css";

import { FilterOption } from "../type";

interface HotelFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  filters: FilterOption[];
}

export default function HotelFilters({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  priceRange,
  onPriceRangeChange,
  filters,
}: HotelFiltersProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Search</h3>
        <input
          type="text"
          placeholder="Search hotels or location..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
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
              onClick={() => onFilterChange(filter.id)}
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
            onChange={(e) => onPriceRangeChange([0, parseInt(e.target.value)])}
            className={styles.rangeSlider}
          />
        </div>
      </div>
    </aside>
  );
}
