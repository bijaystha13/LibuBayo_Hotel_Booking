// "use client";

// import React, { useState, useEffect } from "react";
// import styles from "./HomePage.module.css";

// export default function Home() {
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [guests, setGuests] = useState("2");
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleSearch = () => {
//     console.log({ checkIn, checkOut, guests });
//   };

//   const featuredRooms = [
//     {
//       id: 1,
//       name: "Deluxe Ocean Suite",
//       price: 299,
//       image: "🏖️",
//       features: ["Ocean View", "King Bed", "Balcony"],
//     },
//     {
//       id: 2,
//       name: "Presidential Suite",
//       price: 599,
//       image: "👑",
//       features: ["2 Bedrooms", "Private Terrace", "Butler Service"],
//     },
//     {
//       id: 3,
//       name: "Garden Villa",
//       price: 399,
//       image: "🌺",
//       features: ["Private Pool", "Garden View", "Outdoor Shower"],
//     },
//     {
//       id: 4,
//       name: "Penthouse Luxury",
//       price: 799,
//       image: "🌃",
//       features: ["City View", "Jacuzzi", "Private Lift"],
//     },
//   ];

//   const amenities = [
//     {
//       icon: "🏊",
//       title: "Infinity Pool",
//       desc: "Rooftop pool with stunning views",
//     },
//     { icon: "🍽️", title: "Fine Dining", desc: "Michelin-starred restaurants" },
//     { icon: "💆", title: "Luxury Spa", desc: "World-class wellness center" },
//     { icon: "🏋️", title: "Fitness Center", desc: "24/7 state-of-the-art gym" },
//     { icon: "🎭", title: "Entertainment", desc: "Live shows and events" },
//     { icon: "🚗", title: "Valet Service", desc: "Complimentary parking" },
//   ];

//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "Business Traveler",
//       comment:
//         "Exceptional service and stunning views. The attention to detail is remarkable!",
//       rating: 5,
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       role: "Honeymoon Guest",
//       comment:
//         "Perfect honeymoon destination. Romantic, luxurious, and unforgettable.",
//       rating: 5,
//     },
//     {
//       id: 3,
//       name: "Emily Rodriguez",
//       role: "Family Vacation",
//       comment:
//         "Amazing family-friendly resort. Kids loved the pool and activities!",
//       rating: 5,
//     },
//   ];

//   return (
//     <div className={styles.homePage}>
//       {/* Hero Section */}
//       <section className={styles.hero}>
//         <div className={styles.heroOverlay} />
//         <div
//           className={styles.heroContent}
//           style={{ transform: `translateY(${scrollY * 0.5}px)` }}
//         >
//           <div className={styles.heroText}>
//             <span className={styles.heroSubtitle}>Welcome to Paradise</span>
//             <h1 className={styles.heroTitle}>
//               Experience Luxury
//               <br />
//               Beyond Imagination
//             </h1>
//             <p className={styles.heroDescription}>
//               Discover world-class hospitality in the heart of paradise. Your
//               dream vacation starts here.
//             </p>
//           </div>

//           {/* Search Box */}
//           <div className={styles.searchBox}>
//             <div className={styles.searchGrid}>
//               <div className={styles.searchField}>
//                 <label className={styles.searchLabel}>Check In</label>
//                 <input
//                   type="date"
//                   className={styles.searchInput}
//                   value={checkIn}
//                   onChange={(e) => setCheckIn(e.target.value)}
//                 />
//               </div>
//               <div className={styles.searchField}>
//                 <label className={styles.searchLabel}>Check Out</label>
//                 <input
//                   type="date"
//                   className={styles.searchInput}
//                   value={checkOut}
//                   onChange={(e) => setCheckOut(e.target.value)}
//                 />
//               </div>
//               <div className={styles.searchField}>
//                 <label className={styles.searchLabel}>Guests</label>
//                 <select
//                   className={styles.searchInput}
//                   value={guests}
//                   onChange={(e) => setGuests(e.target.value)}
//                 >
//                   <option value="1">1 Guest</option>
//                   <option value="2">2 Guests</option>
//                   <option value="3">3 Guests</option>
//                   <option value="4">4 Guests</option>
//                   <option value="5">5+ Guests</option>
//                 </select>
//               </div>
//               <button onClick={handleSearch} className={styles.searchButton}>
//                 Search Availability
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className={styles.scrollIndicator}>
//           <span>Scroll to explore</span>
//           <div className={styles.scrollArrow}>↓</div>
//         </div>
//       </section>

//       {/* Featured Rooms Section */}
//       <section className={styles.section}>
//         <div className={styles.container}>
//           <div className={styles.sectionHeader}>
//             <span className={styles.sectionSubtitle}>Accommodations</span>
//             <h2 className={styles.sectionTitle}>Featured Rooms & Suites</h2>
//             <p className={styles.sectionDescription}>
//               Indulge in luxury with our carefully curated selection of premium
//               accommodations
//             </p>
//           </div>

//           <div className={styles.roomsGrid}>
//             {featuredRooms.map((room) => (
//               <div key={room.id} className={styles.roomCard}>
//                 <div className={styles.roomImage}>
//                   <span className={styles.roomEmoji}>{room.image}</span>
//                   <div className={styles.roomBadge}>Featured</div>
//                 </div>
//                 <div className={styles.roomContent}>
//                   <h3 className={styles.roomName}>{room.name}</h3>
//                   <div className={styles.roomFeatures}>
//                     {room.features.map((feature, index) => (
//                       <span key={index} className={styles.roomFeature}>
//                         {feature}
//                       </span>
//                     ))}
//                   </div>
//                   <div className={styles.roomFooter}>
//                     <div className={styles.roomPrice}>
//                       <span className={styles.priceAmount}>${room.price}</span>
//                       <span className={styles.priceUnit}>per night</span>
//                     </div>
//                     <button className={styles.roomButton}>View Details</button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Amenities Section */}
//       <section className={`${styles.section} ${styles.amenitiesSection}`}>
//         <div className={styles.container}>
//           <div className={styles.sectionHeader}>
//             <span className={styles.sectionSubtitle}>
//               World-Class Facilities
//             </span>
//             <h2 className={styles.sectionTitle}>Premium Amenities</h2>
//             <p className={styles.sectionDescription}>
//               Everything you need for an unforgettable stay
//             </p>
//           </div>

//           <div className={styles.amenitiesGrid}>
//             {amenities.map((amenity, index) => (
//               <div key={index} className={styles.amenityCard}>
//                 <div className={styles.amenityIcon}>{amenity.icon}</div>
//                 <h3 className={styles.amenityTitle}>{amenity.title}</h3>
//                 <p className={styles.amenityDesc}>{amenity.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className={styles.section}>
//         <div className={styles.container}>
//           <div className={styles.sectionHeader}>
//             <span className={styles.sectionSubtitle}>Guest Reviews</span>
//             <h2 className={styles.sectionTitle}>What Our Guests Say</h2>
//             <p className={styles.sectionDescription}>
//               Real experiences from real travelers
//             </p>
//           </div>

//           <div className={styles.testimonialsGrid}>
//             {testimonials.map((testimonial) => (
//               <div key={testimonial.id} className={styles.testimonialCard}>
//                 <div className={styles.testimonialRating}>
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <span key={i} className={styles.star}>
//                       ⭐
//                     </span>
//                   ))}
//                 </div>
//                 <p className={styles.testimonialComment}>
//                   &quot;{testimonial.comment}&quot;
//                 </p>
//                 <div className={styles.testimonialAuthor}>
//                   <div className={styles.authorAvatar}>
//                     {testimonial.name.charAt(0)}
//                   </div>
//                   <div className={styles.authorInfo}>
//                     <h4 className={styles.authorName}>{testimonial.name}</h4>
//                     <p className={styles.authorRole}>{testimonial.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className={styles.ctaSection}>
//         <div className={styles.ctaContent}>
//           <h2 className={styles.ctaTitle}>Ready to Experience Luxury?</h2>
//           <p className={styles.ctaDescription}>
//             Book your stay today and enjoy exclusive benefits for early
//             reservations
//           </p>
//           <div className={styles.ctaButtons}>
//             <button className={styles.ctaPrimary}>Book Now</button>
//             <button className={styles.ctaSecondary}>View All Rooms</button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className={styles.footer}>
//         <div className={styles.container}>
//           <div className={styles.footerGrid}>
//             <div className={styles.footerColumn}>
//               <h3 className={styles.footerTitle}>LuxuryStay</h3>
//               <p className={styles.footerText}>
//                 Premium hotels and resorts offering unforgettable experiences
//                 around the world.
//               </p>
//             </div>
//             <div className={styles.footerColumn}>
//               <h4 className={styles.footerHeading}>Quick Links</h4>
//               <ul className={styles.footerLinks}>
//                 <li>
//                   <a href="#rooms">Rooms & Suites</a>
//                 </li>
//                 <li>
//                   <a href="#amenities">Amenities</a>
//                 </li>
//                 <li>
//                   <a href="#offers">Special Offers</a>
//                 </li>
//                 <li>
//                   <a href="#contact">Contact Us</a>
//                 </li>
//               </ul>
//             </div>
//             <div className={styles.footerColumn}>
//               <h4 className={styles.footerHeading}>Contact</h4>
//               <ul className={styles.footerLinks}>
//                 <li>📞 +1 (555) 123-4567</li>
//                 <li>📧 info@luxuryhotel.com</li>
//                 <li>📍 123 Paradise Boulevard</li>
//               </ul>
//             </div>
//           </div>
//           <div className={styles.footerBottom}>
//             <p>© 2024 LuxuryStay. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import HeroSection from "./components/Home/HeroSection";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const featuredRooms = [
    {
      id: 1,
      name: "Deluxe Ocean Suite",
      price: 299,
      image: "🏖️",
      features: ["Ocean View", "King Bed", "Balcony"],
    },
    {
      id: 2,
      name: "Presidential Suite",
      price: 599,
      image: "👑",
      features: ["2 Bedrooms", "Private Terrace", "Butler Service"],
    },
    {
      id: 3,
      name: "Garden Villa",
      price: 399,
      image: "🌺",
      features: ["Private Pool", "Garden View", "Outdoor Shower"],
    },
    {
      id: 4,
      name: "Penthouse Luxury",
      price: 799,
      image: "🌃",
      features: ["City View", "Jacuzzi", "Private Lift"],
    },
  ];

  const amenities = [
    {
      icon: "🏊",
      title: "Infinity Pool",
      desc: "Rooftop pool with stunning views",
    },
    { icon: "🍽️", title: "Fine Dining", desc: "Michelin-starred restaurants" },
    { icon: "💆", title: "Luxury Spa", desc: "World-class wellness center" },
    { icon: "🏋️", title: "Fitness Center", desc: "24/7 state-of-the-art gym" },
    { icon: "🎭", title: "Entertainment", desc: "Live shows and events" },
    { icon: "🚗", title: "Valet Service", desc: "Complimentary parking" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Traveler",
      comment:
        "Exceptional service and stunning views. The attention to detail is remarkable!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Honeymoon Guest",
      comment:
        "Perfect honeymoon destination. Romantic, luxurious, and unforgettable.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Family Vacation",
      comment:
        "Amazing family-friendly resort. Kids loved the pool and activities!",
      rating: 5,
    },
  ];

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Rooms Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Accommodations</span>
            <h2 className={styles.sectionTitle}>Featured Rooms & Suites</h2>
            <p className={styles.sectionDescription}>
              Indulge in luxury with our carefully curated selection of premium
              accommodations
            </p>
          </div>

          <div className={styles.roomsGrid}>
            {featuredRooms.map((room) => (
              <div key={room.id} className={styles.roomCard}>
                <div className={styles.roomImage}>
                  <span className={styles.roomEmoji}>{room.image}</span>
                  <div className={styles.roomBadge}>Featured</div>
                </div>
                <div className={styles.roomContent}>
                  <h3 className={styles.roomName}>{room.name}</h3>
                  <div className={styles.roomFeatures}>
                    {room.features.map((feature, index) => (
                      <span key={index} className={styles.roomFeature}>
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className={styles.roomFooter}>
                    <div className={styles.roomPrice}>
                      <span className={styles.priceAmount}>${room.price}</span>
                      <span className={styles.priceUnit}>per night</span>
                    </div>
                    <button className={styles.roomButton}>View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className={`${styles.section} ${styles.amenitiesSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>
              World-Class Facilities
            </span>
            <h2 className={styles.sectionTitle}>Premium Amenities</h2>
            <p className={styles.sectionDescription}>
              Everything you need for an unforgettable stay
            </p>
          </div>

          <div className={styles.amenitiesGrid}>
            {amenities.map((amenity, index) => (
              <div key={index} className={styles.amenityCard}>
                <div className={styles.amenityIcon}>{amenity.icon}</div>
                <h3 className={styles.amenityTitle}>{amenity.title}</h3>
                <p className={styles.amenityDesc}>{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Guest Reviews</span>
            <h2 className={styles.sectionTitle}>What Our Guests Say</h2>
            <p className={styles.sectionDescription}>
              Real experiences from real travelers
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <div className={styles.testimonialRating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className={styles.star}>
                      ⭐
                    </span>
                  ))}
                </div>
                <p className={styles.testimonialComment}>
                  &quot;{testimonial.comment}&quot;
                </p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className={styles.authorInfo}>
                    <h4 className={styles.authorName}>{testimonial.name}</h4>
                    <p className={styles.authorRole}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Experience Luxury?</h2>
          <p className={styles.ctaDescription}>
            Book your stay today and enjoy exclusive benefits for early
            reservations
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaPrimary}>Book Now</button>
            <button className={styles.ctaSecondary}>View All Rooms</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerColumn}>
              <h3 className={styles.footerTitle}>LuxuryStay</h3>
              <p className={styles.footerText}>
                Premium hotels and resorts offering unforgettable experiences
                around the world.
              </p>
            </div>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>Quick Links</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#rooms">Rooms & Suites</a>
                </li>
                <li>
                  <a href="#amenities">Amenities</a>
                </li>
                <li>
                  <a href="#offers">Special Offers</a>
                </li>
                <li>
                  <a href="#contact">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>Contact</h4>
              <ul className={styles.footerLinks}>
                <li>📞 +1 (555) 123-4567</li>
                <li>📧 info@luxuryhotel.com</li>
                <li>📍 123 Paradise Boulevard</li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2024 LuxuryStay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
