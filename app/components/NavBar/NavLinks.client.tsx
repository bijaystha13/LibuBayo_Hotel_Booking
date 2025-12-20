// "use client";

// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useContext } from "react";
// import { AuthContext } from "@/app/shared/Context/AuthContext";

// import styles from "./NavBar.module.css";
// import Link from "next/link";

// export default function NavLinks() {
//   const authCtx = useContext(AuthContext);
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

//   const handleLinkClick = () => {
//     setMobileMenuOpen(false);
//   };

//   const toggleMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
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

//           {!authCtx.isLoggedIn && (
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
  const userMenuRef = useRef<HTMLDivElement>(null);

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
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

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

  const handleLogout = () => {
    authCtx.logout();
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
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

          {/* Mobile Only Items */}
          {authCtx.isLoggedIn ? (
            <>
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <Link
                  href="/profile"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  👤 Profile
                </Link>
              </li>
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <Link
                  href="/bookings"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  📅 My Bookings
                </Link>
              </li>
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <Link
                  href="/settings"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  ⚙️ Settings
                </Link>
              </li>
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

      {/* Desktop User Menu */}
      {authCtx.isLoggedIn && (
        <div className={styles.userMenuContainer} ref={userMenuRef}>
          <button
            className={styles.userMenuBtn}
            onClick={toggleUserMenu}
            aria-label="User menu"
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
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    {authCtx.user?.email || "user@example.com"}
                  </div>
                </div>
              </div>

              <div className={styles.userDropdownDivider}></div>

              <Link
                href="/profile"
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
                href="/bookings"
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
                href="/settings"
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
      )}

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
