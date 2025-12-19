// "use client";

// import React, { useState } from "react";
// import styles from "./HotelsPage.module.css";

// export default function Hotels() {
//   const [selectedFilter, setSelectedFilter] = useState("all");
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filters = [
//     { id: "all", label: "All Hotels", count: 24 },
//     { id: "luxury", label: "Luxury", count: 8 },
//     { id: "boutique", label: "Boutique", count: 6 },
//     { id: "resort", label: "Resort", count: 10 },
//   ];

//   const hotels = [
//     {
//       id: 1,
//       name: "Grand Oceanic Resort",
//       location: "Maldives",
//       category: "luxury",
//       rating: 4.9,
//       reviews: 328,
//       price: 450,
//       image: "🏝️",
//       amenities: ["Ocean View", "Private Beach", "Spa", "Pool"],
//       description: "Luxury overwater villas with stunning ocean views",
//     },
//     {
//       id: 2,
//       name: "Mountain Peak Lodge",
//       location: "Swiss Alps",
//       category: "resort",
//       rating: 4.8,
//       reviews: 256,
//       price: 380,
//       image: "🏔️",
//       amenities: ["Mountain View", "Ski Access", "Restaurant", "Spa"],
//       description: "Alpine luxury resort with panoramic mountain views",
//     },
//     {
//       id: 3,
//       name: "Urban Chic Hotel",
//       location: "New York City",
//       category: "boutique",
//       rating: 4.7,
//       reviews: 412,
//       price: 320,
//       image: "🏙️",
//       amenities: ["City View", "Rooftop Bar", "Gym", "Restaurant"],
//       description: "Modern boutique hotel in the heart of Manhattan",
//     },
//     {
//       id: 4,
//       name: "Desert Oasis Resort",
//       location: "Dubai",
//       category: "luxury",
//       rating: 4.9,
//       reviews: 289,
//       price: 520,
//       image: "🏜️",
//       amenities: ["Desert View", "Infinity Pool", "Spa", "Golf"],
//       description: "Ultra-luxury resort in the Arabian desert",
//     },
//     {
//       id: 5,
//       name: "Tropical Paradise Hotel",
//       location: "Bali",
//       category: "resort",
//       rating: 4.8,
//       reviews: 367,
//       price: 280,
//       image: "🌴",
//       amenities: ["Garden View", "Pool", "Spa", "Beach Access"],
//       description: "Serene tropical resort surrounded by rice paddies",
//     },
//     {
//       id: 6,
//       name: "Historic Manor House",
//       location: "Cotswolds, UK",
//       category: "boutique",
//       rating: 4.6,
//       reviews: 198,
//       price: 240,
//       image: "🏰",
//       amenities: ["Garden View", "Restaurant", "Bar", "Library"],
//       description: "Charming historic property with English countryside views",
//     },
//     {
//       id: 7,
//       name: "Beachfront Paradise",
//       location: "Caribbean",
//       category: "luxury",
//       rating: 4.9,
//       reviews: 445,
//       price: 480,
//       image: "🏖️",
//       amenities: ["Beach View", "Water Sports", "Spa", "Pool"],
//       description: "Exclusive beachfront resort with crystal-clear waters",
//     },
//     {
//       id: 8,
//       name: "City Lights Boutique",
//       location: "Tokyo",
//       category: "boutique",
//       rating: 4.7,
//       reviews: 334,
//       price: 290,
//       image: "🌆",
//       amenities: ["City View", "Rooftop", "Restaurant", "Bar"],
//       description: "Contemporary design hotel in vibrant Shibuya",
//     },
//     {
//       id: 9,
//       name: "Vineyard Estate Hotel",
//       location: "Tuscany",
//       category: "resort",
//       rating: 4.8,
//       reviews: 276,
//       price: 350,
//       image: "🍇",
//       amenities: ["Vineyard View", "Wine Tasting", "Pool", "Restaurant"],
//       description: "Elegant estate hotel among rolling vineyards",
//     },
//   ];

//   const filteredHotels = hotels.filter((hotel) => {
//     const matchesFilter =
//       selectedFilter === "all" || hotel.category === selectedFilter;
//     const matchesPrice =
//       hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
//     const matchesSearch =
//       hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesFilter && matchesPrice && matchesSearch;
//   });

//   return (
//     <div className={styles.hotelsPage}>
//       {/* Hero Section */}
//       <section className={styles.hero}>
//         <div className={styles.heroContent}>
//           <h1 className={styles.heroTitle}>Discover Your Perfect Stay</h1>
//           <p className={styles.heroDescription}>
//             Explore our curated collection of luxury hotels and resorts
//             worldwide
//           </p>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className={styles.mainContent}>
//         <div className={styles.container}>
//           <div className={styles.contentGrid}>
//             {/* Sidebar Filters */}
//             <aside className={styles.sidebar}>
//               <div className={styles.filterSection}>
//                 <h3 className={styles.filterTitle}>Search</h3>
//                 <div className={styles.searchBox}>
//                   <svg
//                     className={styles.searchIcon}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                   <input
//                     type="text"
//                     placeholder="Search hotels or location..."
//                     className={styles.searchInput}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className={styles.filterSection}>
//                 <h3 className={styles.filterTitle}>Categories</h3>
//                 <div className={styles.filterOptions}>
//                   {filters.map((filter) => (
//                     <button
//                       key={filter.id}
//                       className={`${styles.filterButton} ${
//                         selectedFilter === filter.id ? styles.activeFilter : ""
//                       }`}
//                       onClick={() => setSelectedFilter(filter.id)}
//                     >
//                       <span>{filter.label}</span>
//                       <span className={styles.filterCount}>{filter.count}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className={styles.filterSection}>
//                 <h3 className={styles.filterTitle}>Price Range</h3>
//                 <div className={styles.priceRange}>
//                   <div className={styles.priceLabels}>
//                     <span>${priceRange[0]}</span>
//                     <span>${priceRange[1]}</span>
//                   </div>
//                   <input
//                     type="range"
//                     min="0"
//                     max="1000"
//                     value={priceRange[1]}
//                     onChange={(e) =>
//                       setPriceRange([0, parseInt(e.target.value)])
//                     }
//                     className={styles.rangeSlider}
//                   />
//                 </div>
//               </div>

//               <div className={styles.filterSection}>
//                 <h3 className={styles.filterTitle}>Popular Amenities</h3>
//                 <div className={styles.amenityFilters}>
//                   {[
//                     "Pool",
//                     "Spa",
//                     "Restaurant",
//                     "Beach Access",
//                     "Gym",
//                     "Bar",
//                   ].map((amenity) => (
//                     <label key={amenity} className={styles.checkboxLabel}>
//                       <input type="checkbox" className={styles.checkbox} />
//                       <span>{amenity}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </aside>

//             {/* Hotels Grid */}
//             <main className={styles.hotelsContent}>
//               <div className={styles.resultsHeader}>
//                 <h2 className={styles.resultsTitle}>
//                   {filteredHotels.length} Hotels Found
//                 </h2>
//                 <select className={styles.sortSelect}>
//                   <option value="recommended">Recommended</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="rating">Highest Rated</option>
//                 </select>
//               </div>

//               <div className={styles.hotelsGrid}>
//                 {filteredHotels.map((hotel) => (
//                   <div key={hotel.id} className={styles.hotelCard}>
//                     <div className={styles.hotelImage}>
//                       <span className={styles.hotelEmoji}>{hotel.image}</span>
//                       <div className={styles.hotelBadge}>{hotel.category}</div>
//                       <button className={styles.favoriteBtn}>
//                         <svg
//                           className={styles.heartIcon}
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                           />
//                         </svg>
//                       </button>
//                     </div>

//                     <div className={styles.hotelInfo}>
//                       <div className={styles.hotelHeader}>
//                         <div>
//                           <h3 className={styles.hotelName}>{hotel.name}</h3>
//                           <p className={styles.hotelLocation}>
//                             <svg
//                               className={styles.locationIcon}
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                               />
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                               />
//                             </svg>
//                             {hotel.location}
//                           </p>
//                         </div>
//                         <div className={styles.hotelRating}>
//                           <span className={styles.ratingScore}>
//                             {hotel.rating}
//                           </span>
//                           <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
//                           <span className={styles.reviewCount}>
//                             {hotel.reviews} reviews
//                           </span>
//                         </div>
//                       </div>

//                       <p className={styles.hotelDescription}>
//                         {hotel.description}
//                       </p>

//                       <div className={styles.hotelAmenities}>
//                         {hotel.amenities.map((amenity, index) => (
//                           <span key={index} className={styles.amenityTag}>
//                             {amenity}
//                           </span>
//                         ))}
//                       </div>

//                       <div className={styles.hotelFooter}>
//                         <div className={styles.hotelPrice}>
//                           <span className={styles.priceLabel}>From</span>
//                           <span className={styles.priceAmount}>
//                             ${hotel.price}
//                           </span>
//                           <span className={styles.priceUnit}>per night</span>
//                         </div>
//                         <button className={styles.viewButton}>
//                           View Details
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import HotelsClient from "./HotelsClient";
import styles from "./HotelsPage.module.css";

export default function HotelsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Your Perfect Stay</h1>
          <p className={styles.heroDescription}>
            Explore our curated collection of luxury hotels and resorts
            worldwide
          </p>
        </div>
      </section>

      <HotelsClient />
    </>
  );
}
