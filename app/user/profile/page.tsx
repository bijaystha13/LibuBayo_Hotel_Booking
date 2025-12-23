"use client";

import React, { useState } from "react";
import styles from "./Profile.module.css";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  memberSince: string;
  loyaltyPoints: number;
  totalBookings: number;
  avatar: string;
}

export default function Profile() {
  const [activeSection, setActiveSection] = useState<
    "personal" | "security" | "preferences" | "payment"
  >("personal");
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Alexander",
    lastName: "Morrison",
    email: "alexander.morrison@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: "123 Luxury Avenue",
    city: "New York",
    country: "United States",
    postalCode: "10001",
    memberSince: "2022-03-15",
    loyaltyPoints: 2450,
    totalBookings: 18,
    avatar: "AM",
  });

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileBanner}>
            <div className={styles.bannerOverlay}></div>
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>{profile.avatar}</div>
                <button className={styles.avatarEditBtn}>
                  <span className={styles.cameraIcon}>📷</span>
                </button>
              </div>

              <div className={styles.userDetails}>
                <h1 className={styles.userName}>
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className={styles.userEmail}>{profile.email}</p>
                <div className={styles.membershipBadge}>⭐ Premium Member</div>
              </div>
            </div>

            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>🏆</div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {profile.loyaltyPoints}
                  </div>
                  <div className={styles.statLabel}>Points</div>
                </div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>📅</div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {profile.totalBookings}
                  </div>
                  <div className={styles.statLabel}>Bookings</div>
                </div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>⏰</div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {new Date(profile.memberSince).getFullYear()}
                  </div>
                  <div className={styles.statLabel}>Member Since</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.sectionNav}>
          <button
            className={`${styles.navTab} ${
              activeSection === "personal" ? styles.navTabActive : ""
            }`}
            onClick={() => setActiveSection("personal")}
          >
            <span className={styles.navIcon}>👤</span>
            Personal Info
          </button>
          <button
            className={`${styles.navTab} ${
              activeSection === "security" ? styles.navTabActive : ""
            }`}
            onClick={() => setActiveSection("security")}
          >
            <span className={styles.navIcon}>🔒</span>
            Security
          </button>
          <button
            className={`${styles.navTab} ${
              activeSection === "preferences" ? styles.navTabActive : ""
            }`}
            onClick={() => setActiveSection("preferences")}
          >
            <span className={styles.navIcon}>⚙️</span>
            Preferences
          </button>
          <button
            className={`${styles.navTab} ${
              activeSection === "payment" ? styles.navTabActive : ""
            }`}
            onClick={() => setActiveSection("payment")}
          >
            <span className={styles.navIcon}>💳</span>
            Payment Methods
          </button>
        </div>

        {/* Content Sections */}
        <div className={styles.contentArea}>
          {activeSection === "personal" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Personal Information</h2>
                {!isEditing ? (
                  <button
                    className={styles.editBtn}
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Edit Profile
                  </button>
                ) : (
                  <div className={styles.editActions}>
                    <button className={styles.cancelBtn} onClick={handleCancel}>
                      Cancel
                    </button>
                    <button className={styles.saveBtn} onClick={handleSave}>
                      💾 Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>First Name</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={profile.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Last Name</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={profile.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone Number</label>
                  <input
                    type="tel"
                    className={styles.formInput}
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Date of Birth</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={profile.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Country</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={profile.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.formLabel}>Address</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={profile.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>City</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={profile.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Postal Code</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={profile.postalCode}
                    onChange={(e) =>
                      handleInputChange("postalCode", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Security Settings</h2>
              </div>

              <div className={styles.securityCard}>
                <div className={styles.securityItem}>
                  <div className={styles.securityIcon}>🔑</div>
                  <div className={styles.securityContent}>
                    <h3 className={styles.securityItemTitle}>Password</h3>
                    <p className={styles.securityItemDesc}>
                      Last changed 3 months ago
                    </p>
                  </div>
                  <button className={styles.securityBtn}>Change</button>
                </div>
              </div>

              <div className={styles.securityCard}>
                <div className={styles.securityItem}>
                  <div className={styles.securityIcon}>📱</div>
                  <div className={styles.securityContent}>
                    <h3 className={styles.securityItemTitle}>
                      Two-Factor Authentication
                    </h3>
                    <p className={styles.securityItemDesc}>
                      Add an extra layer of security
                    </p>
                  </div>
                  <button className={styles.securityBtn}>Enable</button>
                </div>
              </div>

              <div className={styles.securityCard}>
                <div className={styles.securityItem}>
                  <div className={styles.securityIcon}>🔔</div>
                  <div className={styles.securityContent}>
                    <h3 className={styles.securityItemTitle}>
                      Login Notifications
                    </h3>
                    <p className={styles.securityItemDesc}>
                      Get notified of new sign-ins
                    </p>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.securityCard}>
                <div className={styles.securityItem}>
                  <div className={styles.securityIcon}>🌐</div>
                  <div className={styles.securityContent}>
                    <h3 className={styles.securityItemTitle}>
                      Active Sessions
                    </h3>
                    <p className={styles.securityItemDesc}>
                      Manage your active devices
                    </p>
                  </div>
                  <button className={styles.securityBtn}>View All</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "preferences" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Preferences</h2>
              </div>

              <div className={styles.preferenceCard}>
                <h3 className={styles.preferenceTitle}>Notifications</h3>
                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceInfo}>
                    <div className={styles.preferenceName}>
                      Email Notifications
                    </div>
                    <div className={styles.preferenceDesc}>
                      Receive booking confirmations and updates
                    </div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceInfo}>
                    <div className={styles.preferenceName}>
                      SMS Notifications
                    </div>
                    <div className={styles.preferenceDesc}>
                      Get text messages for important updates
                    </div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input type="checkbox" />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceInfo}>
                    <div className={styles.preferenceName}>
                      Marketing Emails
                    </div>
                    <div className={styles.preferenceDesc}>
                      Special offers and promotions
                    </div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.preferenceCard}>
                <h3 className={styles.preferenceTitle}>Display</h3>
                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceInfo}>
                    <div className={styles.preferenceName}>Currency</div>
                    <div className={styles.preferenceDesc}>USD - US Dollar</div>
                  </div>
                  <button className={styles.preferenceBtn}>Change</button>
                </div>
                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceInfo}>
                    <div className={styles.preferenceName}>Language</div>
                    <div className={styles.preferenceDesc}>English (US)</div>
                  </div>
                  <button className={styles.preferenceBtn}>Change</button>
                </div>
                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceInfo}>
                    <div className={styles.preferenceName}>Time Zone</div>
                    <div className={styles.preferenceDesc}>EST (UTC-5)</div>
                  </div>
                  <button className={styles.preferenceBtn}>Change</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "payment" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Payment Methods</h2>
                <button className={styles.addPaymentBtn}>+ Add New Card</button>
              </div>

              <div className={styles.paymentCards}>
                <div className={styles.paymentCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardType}>💳 Visa</div>
                    <div className={styles.cardBadge}>Default</div>
                  </div>
                  <div className={styles.cardNumber}>•••• •••• •••• 4532</div>
                  <div className={styles.cardFooter}>
                    <div className={styles.cardExpiry}>Expires 12/26</div>
                    <div className={styles.cardActions}>
                      <button className={styles.cardActionBtn}>Edit</button>
                      <button className={styles.cardActionBtn}>Remove</button>
                    </div>
                  </div>
                </div>

                <div className={styles.paymentCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardType}>💳 Mastercard</div>
                  </div>
                  <div className={styles.cardNumber}>•••• •••• •••• 8910</div>
                  <div className={styles.cardFooter}>
                    <div className={styles.cardExpiry}>Expires 08/25</div>
                    <div className={styles.cardActions}>
                      <button className={styles.cardActionBtn}>Edit</button>
                      <button className={styles.cardActionBtn}>Remove</button>
                    </div>
                  </div>
                </div>

                <div className={styles.addCardPlaceholder}>
                  <div className={styles.addCardIcon}>+</div>
                  <div className={styles.addCardText}>
                    Add New Payment Method
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className={styles.dangerZone}>
          <div className={styles.dangerHeader}>
            <h3 className={styles.dangerTitle}>Danger Zone</h3>
          </div>
          <div className={styles.dangerContent}>
            <div className={styles.dangerItem}>
              <div className={styles.dangerInfo}>
                <div className={styles.dangerName}>Deactivate Account</div>
                <div className={styles.dangerDesc}>
                  Temporarily disable your account
                </div>
              </div>
              <button className={styles.dangerBtn}>Deactivate</button>
            </div>
            <div className={styles.dangerItem}>
              <div className={styles.dangerInfo}>
                <div className={styles.dangerName}>Delete Account</div>
                <div className={styles.dangerDesc}>
                  Permanently delete your account and all data
                </div>
              </div>
              <button className={styles.dangerBtn}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
