// "use client";

import BookingsClient from "./BookingsClient";

// import React, { useContext, useEffect, useState } from "react";
// import styles from "./BookingPage.module.css";
// import { useHttpClient } from "@/app/shared/hooks/httpHook";
// import { useParams } from "next/navigation";
// import { AuthContext } from "@/app/shared/Context/AuthContext";

// interface Booking {
//   id: string;
//   roomName: string;
//   roomType: string;
//   checkIn: string;
//   checkOut: string;
//   guests: number;
//   totalPrice: number;
//   status: "upcoming" | "completed" | "cancelled";
//   roomEmoji: string;
//   bookingDate: string;
// }

// interface ApiBooking {
//   id: string;
//   _id: string;
//   checkInDate: string;
//   checkOutDate: string;
//   guests: number;
//   status: "pending" | "confirmed" | "cancelled";
//   priceAfterTax?: number;
//   totalPrice?: number;
//   createdAt: string;
//   hotel?: {
//     name?: string;
//     type?: string;
//   };
// }

// export default function MyBookings() {
//   const [loadedBookings, setLoadedBookings] = useState<Booking[]>([]);
//   const { clearError, isLoading, sendRequest, error } = useHttpClient();
//   const authCtx = useContext(AuthContext);

//   const userId = authCtx.userId;
//   const params = useParams();

//   const [activeTab, setActiveTab] = useState<
//     "all" | "upcoming" | "completed" | "cancelled"
//   >("all");

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "upcoming":
//         return styles.statusUpcoming;
//       case "completed":
//         return styles.statusCompleted;
//       case "cancelled":
//         return styles.statusCancelled;
//       default:
//         return "";
//     }
//   };

//   const filteredBookings =
//     activeTab === "all"
//       ? loadedBookings
//       : loadedBookings.filter((b) => b.status === activeTab);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const calculateNights = (checkIn: string, checkOut: string) => {
//     const start = new Date(checkIn);
//     const end = new Date(checkOut);
//     const nights = Math.ceil(
//       (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
//     );
//     return nights;
//   };

//   const mapBookingStatus = (
//     apiStatus: string
//   ): "upcoming" | "completed" | "cancelled" => {
//     switch (apiStatus) {
//       case "pending":
//       case "confirmed":
//         return "upcoming";
//       case "cancelled":
//         return "cancelled";
//       default:
//         return "upcoming";
//     }
//   };

//   const getRoomEmoji = (roomType: string): string => {
//     switch (roomType.toLowerCase()) {
//       case "suite":
//         return "👑";
//       case "deluxe":
//         return "🌊";
//       case "villa":
//         return "🌺";
//       case "standard":
//         return "⛰️";
//       default:
//         return "🏨";
//     }
//   };

//   useEffect(() => {
//     if (!userId) {
//       console.warn("User ID is undefined, skipping fetch");
//       return;
//     }

//     async function fetchBookings() {
//       try {
//         console.log("Fetching bookings for user:", userId);
//         const responseData = await sendRequest(
//           `http://localhost:5002/api/booking/${userId}`
//         );
//         console.log("API Response:", responseData);

//         if (responseData && responseData.bookings) {
//           const transformedBookings: Booking[] = responseData.bookings.map(
//             (booking: ApiBooking) => {
//               console.log("Booking data from API:", booking);

//               return {
//                 id: booking._id || booking.id,
//                 roomName: booking.hotel?.name || "Unknown Hotel",
//                 roomType: booking.hotel?.type || "Standard",
//                 checkIn: booking.checkInDate,
//                 checkOut: booking.checkOutDate,
//                 guests: booking.guests,
//                 totalPrice: booking.priceAfterTax || booking.totalPrice || 0,
//                 status: mapBookingStatus(booking.status),
//                 roomEmoji: getRoomEmoji(booking.hotel?.type || "Standard"),
//                 bookingDate: booking.createdAt || new Date().toISOString(),
//               };
//             }
//           );
//           setLoadedBookings(transformedBookings);
//         } else {
//           setLoadedBookings([]);
//         }
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
//         setLoadedBookings([]);
//       }
//     }
//     fetchBookings();
//   }, [sendRequest, userId]);

//   if (isLoading) {
//     return (
//       <div className={styles.bookingsPage}>
//         <div className={styles.container}>
//           <div className={styles.loadingState}>
//             <div className={styles.loadingSpinner}></div>
//             <p>Loading your bookings...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     const isUserIdError = !userId || userId === "undefined";

//     return (
//       <div className={styles.bookingsPage}>
//         <div className={styles.container}>
//           <div className={styles.errorState}>
//             <div className={styles.errorIcon}>⚠️</div>
//             <h3>Failed to load bookings</h3>
//             <p>
//               {isUserIdError
//                 ? `User ID is missing. Available params: ${JSON.stringify(
//                     params
//                   )}`
//                 : error}
//             </p>
//             {isUserIdError ? (
//               <div>
//                 <button
//                   className={styles.btnPrimary}
//                   onClick={() => (window.location.href = "/login")}
//                 >
//                   Go to Login
//                 </button>
//               </div>
//             ) : (
//               <button
//                 className={styles.btnPrimary}
//                 onClick={() => {
//                   clearError();
//                   window.location.reload();
//                 }}
//               >
//                 Try Again
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!userId && !isLoading && !error) {
//     return (
//       <div className={styles.bookingsPage}>
//         <div className={styles.container}>
//           <div className={styles.loadingState}>
//             <div className={styles.loadingSpinner}></div>
//             <p>Loading user information...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.bookingsPage}>
//       <div className={styles.container}>
//         {/* Header */}
//         <div className={styles.pageHeader}>
//           <div className={styles.headerContent}>
//             <h1 className={styles.pageTitle}>My Bookings</h1>
//             <p className={styles.pageSubtitle}>
//               Manage and view all your hotel reservations
//             </p>
//           </div>
//           <button className={styles.newBookingBtn}>+ New Booking</button>
//         </div>

//         {/* Stats Overview */}
//         <div className={styles.statsGrid}>
//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>📅</div>
//             <div className={styles.statContent}>
//               <div className={styles.statValue}>
//                 {loadedBookings.filter((b) => b.status === "upcoming").length}
//               </div>
//               <div className={styles.statLabel}>Upcoming</div>
//             </div>
//           </div>
//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>✅</div>
//             <div className={styles.statContent}>
//               <div className={styles.statValue}>
//                 {loadedBookings.filter((b) => b.status === "completed").length}
//               </div>
//               <div className={styles.statLabel}>Completed</div>
//             </div>
//           </div>
//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>❌</div>
//             <div className={styles.statContent}>
//               <div className={styles.statValue}>
//                 {loadedBookings.filter((b) => b.status === "cancelled").length}
//               </div>
//               <div className={styles.statLabel}>Cancelled</div>
//             </div>
//           </div>
//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>💰</div>
//             <div className={styles.statContent}>
//               <div className={styles.statValue}>
//                 $
//                 {loadedBookings
//                   .filter((b) => b.status === "completed")
//                   .reduce((sum, b) => sum + b.totalPrice, 0)}
//               </div>
//               <div className={styles.statLabel}>Total Spent</div>
//             </div>
//           </div>
//         </div>

//         {/* Filter Tabs */}
//         <div className={styles.tabsContainer}>
//           <button
//             className={`${styles.tab} ${
//               activeTab === "all" ? styles.tabActive : ""
//             }`}
//             onClick={() => setActiveTab("all")}
//           >
//             All Bookings
//             <span className={styles.tabCount}>{loadedBookings.length}</span>
//           </button>
//           <button
//             className={`${styles.tab} ${
//               activeTab === "upcoming" ? styles.tabActive : ""
//             }`}
//             onClick={() => setActiveTab("upcoming")}
//           >
//             Upcoming
//             <span className={styles.tabCount}>
//               {loadedBookings.filter((b) => b.status === "upcoming").length}
//             </span>
//           </button>
//           <button
//             className={`${styles.tab} ${
//               activeTab === "completed" ? styles.tabActive : ""
//             }`}
//             onClick={() => setActiveTab("completed")}
//           >
//             Completed
//             <span className={styles.tabCount}>
//               {loadedBookings.filter((b) => b.status === "completed").length}
//             </span>
//           </button>
//           <button
//             className={`${styles.tab} ${
//               activeTab === "cancelled" ? styles.tabActive : ""
//             }`}
//             onClick={() => setActiveTab("cancelled")}
//           >
//             Cancelled
//             <span className={styles.tabCount}>
//               {loadedBookings.filter((b) => b.status === "cancelled").length}
//             </span>
//           </button>
//         </div>

//         {/* Bookings List */}
//         <div className={styles.bookingsList}>
//           {filteredBookings.length === 0 ? (
//             <div className={styles.emptyState}>
//               <div className={styles.emptyIcon}>📭</div>
//               <h3 className={styles.emptyTitle}>No bookings found</h3>
//               <p className={styles.emptyText}>
//                 You don&apos;t have any {activeTab !== "all" ? activeTab : ""}{" "}
//                 bookings yet.
//               </p>
//               <button className={styles.emptyBtn}>Browse Hotels</button>
//             </div>
//           ) : (
//             filteredBookings.map((booking) => (
//               <div key={booking.id} className={styles.bookingCard}>
//                 <div className={styles.bookingHeader}>
//                   <div className={styles.bookingId}>
//                     Booking #{booking.id.substring(0, 8)}...
//                   </div>
//                   <div
//                     className={`${styles.statusBadge} ${getStatusColor(
//                       booking.status
//                     )}`}
//                   >
//                     {booking.status.charAt(0).toUpperCase() +
//                       booking.status.slice(1)}
//                   </div>
//                 </div>

//                 <div className={styles.bookingContent}>
//                   <div className={styles.roomImageSection}>
//                     <div className={styles.roomImage}>
//                       <span className={styles.roomEmoji}>
//                         {booking.roomEmoji}
//                       </span>
//                     </div>
//                   </div>

//                   <div className={styles.bookingDetails}>
//                     <h3 className={styles.roomName}>{booking.roomName}</h3>
//                     <div className={styles.roomMeta}>
//                       <span className={styles.roomType}>
//                         {booking.roomType}
//                       </span>
//                       <span className={styles.metaDivider}>•</span>
//                       <span className={styles.guestCount}>
//                         {booking.guests} Guests
//                       </span>
//                     </div>

//                     <div className={styles.dateInfo}>
//                       <div className={styles.dateItem}>
//                         <div className={styles.dateLabel}>Check-in</div>
//                         <div className={styles.dateValue}>
//                           {formatDate(booking.checkIn)}
//                         </div>
//                       </div>
//                       <div className={styles.dateArrow}>→</div>
//                       <div className={styles.dateItem}>
//                         <div className={styles.dateLabel}>Check-out</div>
//                         <div className={styles.dateValue}>
//                           {formatDate(booking.checkOut)}
//                         </div>
//                       </div>
//                       <div className={styles.nightsCount}>
//                         {calculateNights(booking.checkIn, booking.checkOut)}{" "}
//                         nights
//                       </div>
//                     </div>

//                     <div className={styles.bookingFooter}>
//                       <div className={styles.priceSection}>
//                         <span className={styles.priceLabel}>Total Price</span>
//                         <span className={styles.priceAmount}>
//                           ${booking.totalPrice.toFixed(2)}
//                         </span>
//                       </div>
//                       <div className={styles.bookingActions}>
//                         {booking.status === "upcoming" && (
//                           <>
//                             <button className={styles.btnSecondary}>
//                               Modify
//                             </button>
//                             <button className={styles.btnDanger}>Cancel</button>
//                           </>
//                         )}
//                         {booking.status === "completed" && (
//                           <>
//                             <button className={styles.btnSecondary}>
//                               View Receipt
//                             </button>
//                             <button className={styles.btnPrimary}>
//                               Book Again
//                             </button>
//                           </>
//                         )}
//                         {booking.status === "cancelled" && (
//                           <button className={styles.btnPrimary}>
//                             Book Again
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function BookingsPage() {
  return <BookingsClient />;
}
