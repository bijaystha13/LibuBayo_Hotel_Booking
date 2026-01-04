import styles from "../HotelsDetailsPage.module.css";

interface PriceBreakdownData {
  pricePerNight: number;
  numberOfNights: number;
  priceBeforeTax: number;
  taxPercentage: number;
  taxAmount: number;
  priceAfterTax: number;
}

interface HotelPriceBreakdownProps {
  estimatedPrice: PriceBreakdownData;
  isSuccess?: boolean;
}

export default function HotelPriceBreakdown({
  estimatedPrice,
  isSuccess = false,
}: HotelPriceBreakdownProps) {
  if (isSuccess) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successHeader}>
          ✅ Booking created successfully!
        </div>
        <div className={styles.priceBreakdownCard}>
          <h3 className={styles.breakdownTitle}>Price Breakdown</h3>
          <div className={styles.breakdownItems}>
            <div className={styles.breakdownItem}>
              <span>Price per night:</span>
              <span>${estimatedPrice.pricePerNight.toFixed(2)}</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Number of nights:</span>
              <span>{estimatedPrice.numberOfNights}</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Subtotal (before tax):</span>
              <span className={styles.subtotal}>
                ${estimatedPrice.priceBeforeTax.toFixed(2)}
              </span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Tax ({estimatedPrice.taxPercentage}%):</span>
              <span>+${estimatedPrice.taxAmount.toFixed(2)}</span>
            </div>
            <div className={styles.breakdownDivider}></div>
            <div className={`${styles.breakdownItem} ${styles.totalRow}`}>
              <span>Total (after tax):</span>
              <span className={styles.totalPrice}>
                ${estimatedPrice.priceAfterTax.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.estimatedPriceCard}>
      <h4 className={styles.estimatedTitle}>Estimated Price</h4>
      <div className={styles.estimatedItems}>
        <div className={styles.estimatedItem}>
          <span>
            ${estimatedPrice.pricePerNight.toFixed(2)} ×{" "}
            {estimatedPrice.numberOfNights} nights
          </span>
          <span>${estimatedPrice.priceBeforeTax.toFixed(2)}</span>
        </div>
        <div className={styles.estimatedItem}>
          <span>Tax ({estimatedPrice.taxPercentage}%)</span>
          <span>${estimatedPrice.taxAmount.toFixed(2)}</span>
        </div>
        <div className={styles.estimatedDivider}></div>
        <div className={`${styles.estimatedItem} ${styles.estimatedTotal}`}>
          <span>Total</span>
          <span>${estimatedPrice.priceAfterTax.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
