"use client";

import { useState } from "react";
import styles from "../HotelsPage.module.css";

import { SortOption } from "../type";

interface HotelSortProps {
  sortOption: string;
  onSortChange: (option: string) => void;
  sortOptions: SortOption[];
}

export default function HotelSort({
  sortOption,
  onSortChange,
  sortOptions,
}: HotelSortProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = (value: string) => {
    onSortChange(value);
    setIsDropdownOpen(false);
  };

  const selectedSortLabel = sortOptions.find(
    (opt) => opt.value === sortOption
  )?.label;

  return (
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
                sortOption === option.value ? styles.dropdownItemActive : ""
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
  );
}
