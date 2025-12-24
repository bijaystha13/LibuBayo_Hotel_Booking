// "use client";

// import { usePathname } from "next/navigation";
// import { useState, useEffect, useRef } from "react";
// import { useContext } from "react";
// import { AuthContext } from "@/app/shared/Context/AuthContext";

// import styles from "./NavBar.module.css";
// import Link from "next/link";

// export default function NavLinks() {
//   const authCtx = useContext(AuthContext);
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const userMenuRef = useRef<HTMLDivElement>(null);

//   const isActive = (path: string) =>
//     pathname === path ? styles.activeLink : "";

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setMobileMenuOpen(false);
//     }, 0);

//     return () => clearTimeout(timeout);
//   }, [pathname]);

//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//       document.documentElement.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//       document.documentElement.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//       document.documentElement.style.overflow = "unset";
//     };
//   }, [mobileMenuOpen]);

//   // Close user menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         userMenuRef.current &&
//         !userMenuRef.current.contains(event.target as Node)
//       ) {
//         setUserMenuOpen(false);
//       }
//     };

//     if (userMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [userMenuOpen]);

//   const handleLinkClick = () => {
//     setMobileMenuOpen(false);
//     setUserMenuOpen(false);
//   };

//   const toggleMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const toggleUserMenu = () => {
//     setUserMenuOpen(!userMenuOpen);
//   };

//   const handleLogout = () => {
//     authCtx.logout();
//     setUserMenuOpen(false);
//     setMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <div
//         className={`${styles.overlay} ${mobileMenuOpen ? styles.active : ""}`}
//         onClick={() => setMobileMenuOpen(false)}
//       />

//       <div
//         className={`${styles.navCenter} ${
//           mobileMenuOpen ? styles.mobileMenuOpen : ""
//         }`}
//       >
//         <ul className={styles.navLinks}>
//           <li className={styles.navItem}>
//             <Link
//               href="/"
//               className={`${styles.navLink} ${isActive("/")}`}
//               onClick={handleLinkClick}
//             >
//               Home
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link
//               href="/hotels"
//               className={`${styles.navLink} ${isActive("/hotels")}`}
//               onClick={handleLinkClick}
//             >
//               Hotels
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link
//               href="/amenities"
//               className={`${styles.navLink} ${isActive("/amenities")}`}
//               onClick={handleLinkClick}
//             >
//               Amenities
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link
//               href="/specialoffers"
//               className={`${styles.navLink} ${isActive("/specialoffers")}`}
//               onClick={handleLinkClick}
//             >
//               Special Offers
//               <span className={styles.dealsBadge}>HOT</span>
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link
//               href="/gallery"
//               className={`${styles.navLink} ${isActive("/gallery")}`}
//               onClick={handleLinkClick}
//             >
//               Gallery
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link
//               href="/contact"
//               className={`${styles.navLink} ${isActive("/contact")}`}
//               onClick={handleLinkClick}
//             >
//               Contact
//             </Link>
//           </li>

//           {/* Mobile Only Items */}
//           {authCtx.isLoggedIn ? (
//             <>
//               <li className={`${styles.navItem} ${styles.mobileOnly}`}>
//                 <Link
//                   href="/profile"
//                   className={styles.navLink}
//                   onClick={handleLinkClick}
//                 >
//                   👤 Profile
//                 </Link>
//               </li>
//               <li className={`${styles.navItem} ${styles.mobileOnly}`}>
//                 <Link
//                   href="/user/booking"
//                   className={styles.navLink}
//                   onClick={handleLinkClick}
//                 >
//                   📅 My Bookings
//                 </Link>
//               </li>
//               <li className={`${styles.navItem} ${styles.mobileOnly}`}>
//                 <Link
//                   href="/settings"
//                   className={styles.navLink}
//                   onClick={handleLinkClick}
//                 >
//                   ⚙️ Settings
//                 </Link>
//               </li>
//               <li className={`${styles.navItem} ${styles.mobileOnly}`}>
//                 <button
//                   className={styles.mobileLoginBtn}
//                   onClick={handleLogout}
//                   style={{
//                     background: "linear-gradient(135deg, #f5576c, #f093fb)",
//                   }}
//                 >
//                   🚪 Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <li className={`${styles.navItem} ${styles.mobileOnly}`}>
//               <Link
//                 href="/login"
//                 className={styles.mobileLoginBtn}
//                 onClick={handleLinkClick}
//               >
//                 Login
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>

//       {/* Desktop User Menu */}
//       {authCtx.isLoggedIn && (
//         <div className={styles.userMenuContainer} ref={userMenuRef}>
//           <button
//             className={styles.userMenuBtn}
//             onClick={toggleUserMenu}
//             aria-label="User menu"
//           >
//             <svg
//               className={styles.userIcon}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//               />
//             </svg>
//           </button>

//           {userMenuOpen && (
//             <div className={styles.userDropdown}>
//               <div className={styles.userDropdownHeader}>
//                 <div className={styles.userAvatar}>
//                   <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>
//                 </div>
//                 <div className={styles.userInfo}>
//                   <div className={styles.userName}>Welcome back!</div>
//                   <div className={styles.userEmail}>
//                     {authCtx.name || "user@example.com"}
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.userDropdownDivider}></div>

//               <Link
//                 href="/user/profile"
//                 className={styles.userDropdownItem}
//                 onClick={() => setUserMenuOpen(false)}
//               >
//                 <svg
//                   className={styles.dropdownIcon}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//                 Profile
//               </Link>

//               <Link
//                 href="/user/booking"
//                 className={styles.userDropdownItem}
//                 onClick={() => setUserMenuOpen(false)}
//               >
//                 <svg
//                   className={styles.dropdownIcon}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//                 My Bookings
//               </Link>

//               <Link
//                 href="/settings"
//                 className={styles.userDropdownItem}
//                 onClick={() => setUserMenuOpen(false)}
//               >
//                 <svg
//                   className={styles.dropdownIcon}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//                 Settings
//               </Link>

//               <div className={styles.userDropdownDivider}></div>

//               <button
//                 className={styles.userDropdownItem}
//                 onClick={handleLogout}
//                 style={{ color: "#f5576c" }}
//               >
//                 <svg
//                   className={styles.dropdownIcon}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                   />
//                 </svg>
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       <button
//         className={`${styles.mobileMenuBtn} ${
//           mobileMenuOpen ? styles.menuOpen : ""
//         }`}
//         onClick={toggleMenu}
//         aria-label="Toggle menu"
//       >
//         <svg
//           className={styles.menuIcon}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <line
//             x1="3"
//             y1="6"
//             x2="21"
//             y2="6"
//             strokeWidth="2"
//             className={styles.line1}
//           />
//           <line
//             x1="3"
//             y1="12"
//             x2="21"
//             y2="12"
//             strokeWidth="2"
//             className={styles.line2}
//           />
//           <line
//             x1="3"
//             y1="18"
//             x2="21"
//             y2="18"
//             strokeWidth="2"
//             className={styles.line3}
//           />
//         </svg>
//       </button>
//     </>
//   );
// }

"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "@/app/shared/Context/AuthContext";

import styles from "./NavBar.module.css";
import Link from "next/link";

export default function NavLinks() {
  const authCtx = useContext(AuthContext);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock data - replace with actual data from your context/API
  const notificationCount = 3; // Example unread notifications
  const favoritesCount = 5; // Example favorites count

  const isActive = (path: string) =>
    pathname === path ? styles.activeLink : "";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMobileMenuOpen(false);
    }, 0);

    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    if (userMenuOpen || searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen, searchOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleLogout = () => {
    authCtx.logout();
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
    // Example: router.push(`/search?q=${searchQuery}`);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${mobileMenuOpen ? styles.active : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`${styles.navCenter} ${
          mobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <Link
              href="/"
              className={`${styles.navLink} ${isActive("/")}`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/hotels"
              className={`${styles.navLink} ${isActive("/hotels")}`}
              onClick={handleLinkClick}
            >
              Hotels
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/amenities"
              className={`${styles.navLink} ${isActive("/amenities")}`}
              onClick={handleLinkClick}
            >
              Amenities
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/specialoffers"
              className={`${styles.navLink} ${isActive("/specialoffers")}`}
              onClick={handleLinkClick}
            >
              Special Offers
              <span className={styles.dealsBadge}>HOT</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/gallery"
              className={`${styles.navLink} ${isActive("/gallery")}`}
              onClick={handleLinkClick}
            >
              Gallery
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/contact"
              className={`${styles.navLink} ${isActive("/contact")}`}
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/help"
              className={`${styles.navLink} ${isActive("/help")}`}
              onClick={handleLinkClick}
            >
              Help
            </Link>
          </li>

          {/* Mobile Only Items */}
          {authCtx.isLoggedIn ? (
            <>
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <Link
                  href="/user/profile"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  👤 Profile
                </Link>
              </li>
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <Link
                  href="/user/bookings"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  📅 My Bookings
                </Link>
              </li>
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <Link
                  href="/user/favorites"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  ❤️ Favorites
                  {favoritesCount > 0 && (
                    <span className={styles.countBadge}>{favoritesCount}</span>
                  )}
                </Link>
              </li>
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <Link
                  href="/user/notifications"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  🔔 Notifications
                  {notificationCount > 0 && (
                    <span className={styles.countBadge}>
                      {notificationCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <Link
                  href="/user/settings"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  ⚙️ Settings
                </Link>
              </li>
              {authCtx.role === "admin" && (
                <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                  <Link
                    href="/admin"
                    className={styles.navLink}
                    onClick={handleLinkClick}
                  >
                    🛡️ Admin Dashboard
                  </Link>
                </li>
              )}
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <button
                  className={styles.mobileLoginBtn}
                  onClick={handleLogout}
                  style={{
                    background: "linear-gradient(135deg, #f5576c, #f093fb)",
                  }}
                >
                  🚪 Logout
                </button>
              </li>
            </>
          ) : (
            <li className={`${styles.navItem} ${styles.mobileOnly}`}>
              <Link
                href="/login"
                className={styles.mobileLoginBtn}
                onClick={handleLinkClick}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Desktop Right Side Actions */}
      <div className={styles.desktopActions}>
        {/* Search Bar */}
        <div className={styles.searchContainer} ref={searchRef}>
          <button
            className={styles.searchBtn}
            onClick={toggleSearch}
            aria-label="Search"
          >
            <svg
              className={styles.searchIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {searchOpen && (
            <form className={styles.searchDropdown} onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Search hotels, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                autoFocus
              />
              <button type="submit" className={styles.searchSubmitBtn}>
                Search
              </button>
            </form>
          )}
        </div>

        {authCtx.isLoggedIn ? (
          <>
            {/* Favorites */}
            <Link href="/user/favorites" className={styles.iconBtn}>
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {favoritesCount > 0 && (
                <span className={styles.iconBadge}>{favoritesCount}</span>
              )}
            </Link>

            {/* Notifications */}
            <Link href="/user/notifications" className={styles.iconBtn}>
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {notificationCount > 0 && (
                <span className={styles.iconBadge}>{notificationCount}</span>
              )}
            </Link>

            {/* User Menu */}
            <div className={styles.userMenuContainer} ref={userMenuRef}>
              <button
                className={styles.userMenuBtn}
                onClick={toggleUserMenu}
                aria-label="User menu"
                aria-expanded={userMenuOpen}
              >
                <svg
                  className={styles.userIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>

              {userMenuOpen && (
                <div className={styles.userDropdown}>
                  <div className={styles.userDropdownHeader}>
                    <div className={styles.userAvatar}>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className={styles.userInfo}>
                      <div className={styles.userName}>Welcome back!</div>
                      <div className={styles.userEmail}>
                        {authCtx?.name || "Guest"}
                      </div>
                    </div>
                  </div>

                  <div className={styles.userDropdownDivider}></div>

                  <Link
                    href="/user/profile"
                    className={styles.userDropdownItem}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <svg
                      className={styles.dropdownIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </Link>

                  <Link
                    href="/user/bookings"
                    className={styles.userDropdownItem}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <svg
                      className={styles.dropdownIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    My Bookings
                  </Link>

                  <Link
                    href="/user/favorites"
                    className={styles.userDropdownItem}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <svg
                      className={styles.dropdownIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Favorites
                  </Link>

                  <Link
                    href="/user/settings"
                    className={styles.userDropdownItem}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <svg
                      className={styles.dropdownIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </Link>

                  {authCtx.role === "admin" && (
                    <>
                      <div className={styles.userDropdownDivider}></div>
                      <Link
                        href="/admin"
                        className={styles.userDropdownItem}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <svg
                          className={styles.dropdownIcon}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        Admin Dashboard
                      </Link>
                    </>
                  )}

                  <div className={styles.userDropdownDivider}></div>

                  <button
                    className={styles.userDropdownItem}
                    onClick={handleLogout}
                    style={{ color: "#f5576c" }}
                  >
                    <svg
                      className={styles.dropdownIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          // Desktop Login Button for logged out users
          <Link href="/login" className={styles.signInBtn}>
            Login
          </Link>
        )}
      </div>

      <button
        className={`${styles.mobileMenuBtn} ${
          mobileMenuOpen ? styles.menuOpen : ""
        }`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          className={styles.menuIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
            strokeWidth="2"
            className={styles.line1}
          />
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            strokeWidth="2"
            className={styles.line2}
          />
          <line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
            strokeWidth="2"
            className={styles.line3}
          />
        </svg>
      </button>
    </>
  );
}
