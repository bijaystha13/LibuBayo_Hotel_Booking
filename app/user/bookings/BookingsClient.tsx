"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/shared/Context/AuthContext";
import { useHttpClient } from "@/app/shared/hooks/httpHook";
import styles from "./BookingPage.module.css";

import BookingsStats from "./components/BookingsStats";

import BookingsTabs from "./components/BookingsTabs";
import BookingsList from "./components/BookingsList";

import { Booking, ApiBooking } from "./components/types";
import BookingsHeader from "./components/BookingsHeader";

export default function BookingsClient() {
  const [loadedBookings, setLoadedBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

  const { sendRequest, isLoading, error } = useHttpClient();
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (!userId) return;

    async function fetchBookings() {
      try {
        const responseData = await sendRequest(
          `http://localhost:5002/api/booking/${userId}`
        );

        if (!responseData || !responseData.bookings) {
          setLoadedBookings([]);
          return;
        }

        const transformed = responseData.bookings.map((b: ApiBooking) => ({
          id: b._id,
          roomName: b.hotel?.name ?? "Unknown Hotel",
          roomType: b.hotel?.type ?? "Standard",

          //   hotelImage:
          //     b.hotel?.image && b.hotel.image.length > 0
          //       ? `http://localhost:5002/${b.hotel.image[0]}`
          //       : "/images/hotel-placeholder.jpg",

          hotelImages:
            b.hotel?.image && b.hotel.image.length > 0
              ? b.hotel.image.map((img) => `http://localhost:5002/${img}`)
              : [],

          checkIn: b.checkInDate,
          checkOut: b.checkOutDate,
          guests: b.guests,
          totalPrice: b.priceAfterTax ?? b.totalPrice ?? 0,
          status: mapBookingStatus(b.status),
          roomEmoji: getRoomEmoji(b.hotel?.type ?? "standard"),
          bookingDate: b.createdAt,
        }));

        setLoadedBookings(transformed);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setLoadedBookings([]);
      }
    }

    fetchBookings();
  }, [userId, sendRequest]);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.bookingsPage}>
      <div className={styles.container}>
        <BookingsHeader />
        <BookingsStats bookings={loadedBookings} />
        <BookingsTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bookings={loadedBookings}
        />
        <BookingsList bookings={loadedBookings} activeTab={activeTab} />
      </div>
    </div>
  );
}

function mapBookingStatus(status: ApiBooking["status"]) {
  if (status === "cancelled") return "cancelled";
  return "upcoming";
}

function getRoomEmoji(type: string) {
  switch (type.toLowerCase()) {
    case "suite":
      return "👑";
    case "deluxe":
      return "🌊";
    case "villa":
      return "🌺";
    default:
      return "🏨";
  }
}
