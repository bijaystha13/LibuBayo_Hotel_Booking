"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useHttpClient } from "@/app/shared/hooks/httpHook";
import { useContext } from "react";
import { AuthContext } from "@/app/shared/Context/AuthContext";
import styles from "../HotelsDetailsPage.module.css";

import HotelPriceBreakdown from "./HotelPriceBreakdown";
import { Hotel, PriceBreakdown } from "../../type";

interface HotelBookingCardProps {
  hotel: Hotel;
  onBookingSuccess: (priceBreakdown: PriceBreakdown) => void;
}

export default function HotelBookingCard({
  hotel,
  onBookingSuccess,
}: HotelBookingCardProps) {
  const router = useRouter();
  const { sendRequest } = useHttpClient();
  const authCtx = useContext(AuthContext);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [taxPercentage, setTaxPercentage] = useState(10);
  const [bookingLoading, setBookingLoading] = useState(false);

  const calculateEstimatedPrice = () => {
    if (!hotel || !checkInDate || !checkOutDate) return null;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) return null;

    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );

    const priceBeforeTax = hotel.pricePerNight * nights;
    const taxAmount = (priceBeforeTax * taxPercentage) / 100;
    const priceAfterTax = priceBeforeTax + taxAmount;

    return {
      pricePerNight: hotel.pricePerNight,
      numberOfNights: nights,
      priceBeforeTax,
      taxPercentage,
      taxAmount,
      priceAfterTax,
    };
  };

  const estimatedPrice = calculateEstimatedPrice();

  const handleBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    if (!authCtx.userId) {
      toast.error("Please log in to book a hotel");
      router.push("/login");
      return;
    }

    setBookingLoading(true);

    try {
      const bookingData = {
        user: authCtx.userId,
        hotel: hotel._id,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: guests,
        tax: taxPercentage,
      };

      const responseData = await sendRequest(
        "http://localhost:5002/api/booking",
        "POST",
        JSON.stringify(bookingData),
        {
          "Content-Type": "application/json",
        }
      );

      if (responseData?.booking && responseData?.priceBreakdown) {
        onBookingSuccess(responseData.priceBreakdown);

        toast.success("🎉 Booking confirmed successfully!", {
          autoClose: 2000,
        });

        setTimeout(() => {
          router.push("/user/bookings");
        }, 2000);
      }
    } catch (err: any) {
      console.error("Booking error:", err);

      if (err.isNetworkError || err.message?.includes("connect")) {
        toast.error(
          "Unable to complete booking. Please check your connection.",
          {
            autoClose: false,
          }
        );
      } else {
        toast.error(
          err.message || "Failed to create booking. Please try again."
        );
      }
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className={styles.bookingCard}>
      <div className={styles.priceSection}>
        {hotel.originalPrice && (
          <div className={styles.originalPrice}>${hotel.originalPrice}</div>
        )}
        <div className={styles.currentPrice}>
          <span className={styles.priceAmount}>${hotel.pricePerNight}</span>
          <span className={styles.priceUnit}> / night</span>
        </div>
        {hotel.originalPrice && (
          <div className={styles.savingsInfo}>
            <span className={styles.savings}>
              Save ${hotel.originalPrice - hotel.pricePerNight}
            </span>
          </div>
        )}
      </div>

      <div className={styles.bookingForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Check-in</label>
          <input
            type="date"
            className={styles.formInput}
            min={new Date().toISOString().split("T")[0]}
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Check-out</label>
          <input
            type="date"
            className={styles.formInput}
            min={new Date().toISOString().split("T")[0]}
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Guests</label>
          <select
            className={styles.formInput}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5+ Guests</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tax Percentage (%)</label>
          <input
            type="number"
            className={styles.formInput}
            value={taxPercentage}
            onChange={(e) =>
              setTaxPercentage(
                Math.max(0, Math.min(100, parseInt(e.target.value) || 0))
              )
            }
            min="0"
            max="100"
            step="1"
          />
        </div>

        {estimatedPrice && (
          <HotelPriceBreakdown estimatedPrice={estimatedPrice} />
        )}

        <button
          className={styles.bookButton}
          onClick={handleBooking}
          disabled={bookingLoading}
        >
          {bookingLoading ? (
            <>
              <span className={styles.buttonSpinner}></span>
              Processing...
            </>
          ) : (
            "Book Now"
          )}
        </button>

        <div className={styles.bookingNote}>You won&apos;t be charged yet</div>
      </div>

      <div className={styles.highlights}>
        <div className={styles.highlightItem}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M16.6667 5L7.50004 14.1667L3.33337 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Free cancellation</span>
        </div>
        <div className={styles.highlightItem}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M16.6667 5L7.50004 14.1667L3.33337 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>No prepayment needed</span>
        </div>
        <div className={styles.highlightItem}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M16.6667 5L7.50004 14.1667L3.33337 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Instant confirmation</span>
        </div>
      </div>
    </div>
  );
}
