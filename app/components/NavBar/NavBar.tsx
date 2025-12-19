// "use client";

// import React, { useState } from "react";
// import styles from "./NavBar.module.css";
// import Link from "next/link";

// const Navbar = () => {
//   const [activeLink, setActiveLink] = useState<string>("home");

//   const handleLinkClick = (link: string) => {
//     setActiveLink(link);
//   };

//   return (
//     <>
//       <nav className={styles.navbar}>
//         <div className={styles.topBar}>
//           <div className={styles.topBarContainer}>
//             <div className={styles.topBarLeft}>
//               <div className={styles.topBarItem}>
//                 <svg
//                   className={styles.topBarIcon}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                   />
//                 </svg>
//                 <span>+1 (555) 123-4567</span>
//               </div>
//               <div className={styles.topBarItem}>
//                 <svg
//                   className={styles.topBarIcon}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//                 <span>info@luxuryhotel.com</span>
//               </div>
//             </div>
//             <div className={styles.topBarRight}>
//               <div className={styles.topBarItem}>
//                 <svg
//                   className={styles.topBarIcon}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span>24/7 Support</span>
//               </div>
//               <button className={styles.languageBtn}>
//                 <svg
//                   className={styles.topBarIcon}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
//                   />
//                 </svg>
//                 EN
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Navigation */}
//         <div className={styles.mainNav}>
//           <div className={styles.navContainer}>
//             <div className={styles.navLeft}>
//               <a href="#" className={styles.logo}>
//                 <span className={styles.logoIcon}>🏨</span>
//                 <div className={styles.logoText}>
//                   <span className={styles.logoName}>LuxuryStay</span>
//                   <span className={styles.logoTagline}>
//                     Premium Hotels & Resorts
//                   </span>
//                 </div>
//               </a>
//             </div>

//             <div className={styles.navCenter}>
//               <ul className={styles.navLinks}>
//                 <li className={styles.navItem}>
//                   <Link
//                     href="/"
//                     className={`${styles.navLink} ${
//                       activeLink === "home" ? styles.activeLink : ""
//                     }`}
//                     onClick={() => handleLinkClick("home")}
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li className={styles.navItem}>
//                   <Link
//                     href="/hotels"
//                     className={`${styles.navLink} ${
//                       activeLink === "rooms" ? styles.activeLink : ""
//                     }`}
//                     onClick={() => handleLinkClick("rooms")}
//                   >
//                     Rooms & Suites
//                   </Link>
//                 </li>
//                 <li className={styles.navItem}>
//                   <a
//                     href="#amenities"
//                     className={`${styles.navLink} ${
//                       activeLink === "amenities" ? styles.activeLink : ""
//                     }`}
//                     onClick={() => handleLinkClick("amenities")}
//                   >
//                     Amenities
//                   </a>
//                 </li>
//                 <li className={styles.navItem}>
//                   <a
//                     href="#offers"
//                     className={`${styles.navLink} ${
//                       activeLink === "offers" ? styles.activeLink : ""
//                     }`}
//                     onClick={() => handleLinkClick("offers")}
//                   >
//                     Special Offers
//                     <span className={styles.dealsBadge}>HOT</span>
//                   </a>
//                 </li>
//                 <li className={styles.navItem}>
//                   <a
//                     href="#gallery"
//                     className={`${styles.navLink} ${
//                       activeLink === "gallery" ? styles.activeLink : ""
//                     }`}
//                     onClick={() => handleLinkClick("gallery")}
//                   >
//                     Gallery
//                   </a>
//                 </li>
//                 <li className={styles.navItem}>
//                   <a
//                     href="#contact"
//                     className={`${styles.navLink} ${
//                       activeLink === "contact" ? styles.activeLink : ""
//                     }`}
//                     onClick={() => handleLinkClick("contact")}
//                   >
//                     Contact
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div className={styles.navRight}>
//               <button className={styles.searchBtn}>
//                 <svg
//                   className={styles.searchIcon}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </button>
//               <a href="#booking" className={styles.signInBtn}>
//                 Login
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import styles from "./NavBar.module.css";
import Link from "next/link";
import NavLinks from "./NavLinks.client";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <span>📞 +1 (555) 123-4567</span>
          <span>✉️ info@elitehotel.com</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={styles.mainNav}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🏨</span>
            <div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>LinuBayo Elite Hotel</span>
                <span className={styles.logoTagline}>
                  Premium Hotels & Resorts
                </span>
              </div>
            </div>
          </Link>

          <NavLinks />

          <div className={styles.navRight}>
            <button className={styles.searchBtn}>🔍</button>
            <Link href="/login" className={styles.signInBtn}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
