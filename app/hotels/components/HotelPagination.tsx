"use client";

import styles from "../HotelsPage.module.css";

interface HotelPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function HotelPagination({
  currentPage,
  totalPages,
  onPageChange,
}: HotelPaginationProps) {
  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  return (
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
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`${styles.paginationNumber} ${
              currentPage === page ? styles.activePage : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
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
  );
}
