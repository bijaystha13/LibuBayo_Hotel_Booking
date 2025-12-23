"use client";

import { useState } from "react";
import styles from "./Settings.module.css";

interface UserSettings {
  // Account Settings
  email: string;
  phone: string;
  language: string;
  currency: string;

  // Notification Preferences
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  bookingReminders: boolean;
  specialOffers: boolean;

  // Privacy Settings
  profileVisibility: string;
  showBookingHistory: boolean;
  shareDataWithPartners: boolean;

  // Security Settings
  twoFactorAuth: boolean;
  loginAlerts: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "account" | "notifications" | "privacy" | "security"
  >("account");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [settings, setSettings] = useState<UserSettings>({
    email: "user@example.com",
    phone: "+1 (555) 123-4567",
    language: "en",
    currency: "USD",

    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    bookingReminders: true,
    specialOffers: true,

    profileVisibility: "private",
    showBookingHistory: false,
    shareDataWithPartners: false,

    twoFactorAuth: false,
    loginAlerts: true,
  });

  const handleInputChange = (
    field: keyof UserSettings,
    value: string | boolean
  ) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // Handle account deletion
      console.log("Account deletion requested");
    }
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>
            Manage your account preferences and settings
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className={styles.successMessage}>
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Settings saved successfully!
          </div>
        )}

        <div className={styles.settingsLayout}>
          {/* Sidebar Navigation */}
          <div className={styles.sidebar}>
            <button
              className={`${styles.sidebarBtn} ${
                activeTab === "account" ? styles.activeBtn : ""
              }`}
              onClick={() => setActiveTab("account")}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Account
            </button>

            <button
              className={`${styles.sidebarBtn} ${
                activeTab === "notifications" ? styles.activeBtn : ""
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              Notifications
            </button>

            <button
              className={`${styles.sidebarBtn} ${
                activeTab === "privacy" ? styles.activeBtn : ""
              }`}
              onClick={() => setActiveTab("privacy")}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Privacy
            </button>

            <button
              className={`${styles.sidebarBtn} ${
                activeTab === "security" ? styles.activeBtn : ""
              }`}
              onClick={() => setActiveTab("security")}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Security
            </button>
          </div>

          {/* Settings Content */}
          <div className={styles.content}>
            {/* Account Settings */}
            {activeTab === "account" && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Account Information</h2>
                <p className={styles.sectionDesc}>
                  Update your account details and preferences
                </p>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) =>
                        handleInputChange("language", e.target.value)
                      }
                      className={styles.select}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) =>
                        handleInputChange("currency", e.target.value)
                      }
                      className={styles.select}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>
                </div>

                <div className={styles.dangerZone}>
                  <h3 className={styles.dangerTitle}>Danger Zone</h3>
                  <p className={styles.dangerDesc}>
                    Once you delete your account, there is no going back.
                  </p>
                  <button
                    className={styles.dangerBtn}
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  Notification Preferences
                </h2>
                <p className={styles.sectionDesc}>
                  Choose how you want to receive notifications
                </p>

                <div className={styles.settingsGroup}>
                  <h3 className={styles.groupTitle}>Communication Channels</h3>

                  <div className={styles.toggleItem}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>
                        Email Notifications
                      </div>
                      <div className={styles.toggleDesc}>
                        Receive notifications via email
                      </div>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) =>
                          handleInputChange(
                            "emailNotifications",
                            e.target.checked
                          )
                        }
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleItem}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>
                        SMS Notifications
                      </div>
                      <div className={styles.toggleDesc}>
                        Receive notifications via text message
                      </div>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) =>
                          handleInputChange(
                            "smsNotifications",
                            e.target.checked
                          )
                        }
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleItem}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>
                        Push Notifications
                      </div>
                      <div className={styles.toggleDesc}>
                        Receive notifications on your device
                      </div>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={(e) =>
                          handleInputChange(
                            "pushNotifications",
                            e.target.checked
                          )
                        }
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                </div>

                <div className={styles.settingsGroup}>
                  <h3 className={styles.groupTitle}>Notification Types</h3>

                  <div className={styles.toggleItem}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>Marketing Emails</div>
                      <div className={styles.toggleDesc}>
                        Receive promotional offers and updates
                      </div>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={settings.marketingEmails}
                        onChange={(e) =>
                          handleInputChange("marketingEmails", e.target.checked)
                        }
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleItem}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>
                        Booking Reminders
                      </div>
                      <div className={styles.toggleDesc}>
                        Get reminders about upcoming bookings
                      </div>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={settings.bookingReminders}
                        onChange={(e) =>
                          handleInputChange(
                            "bookingReminders",
                            e.target.checked
                          )
                        }
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleItem}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>Special Offers</div>
                      <div className={styles.toggleDesc}>
                        Receive notifications about special deals
                      </div>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={settings.specialOffers}
                        onChange={(e) =>
                          handleInputChange("specialOffers", e.target.checked)
                        }
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Privacy Settings</h2>
                <p className={styles.sectionDesc}>
                  Control your privacy and data sharing preferences
                </p>

                <div className={styles.settingsGroup}>
                  <h3 className={styles.groupTitle}>Profile Privacy</h3>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Profile Visibility</label>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) =>
                        handleInputChange("profileVisibility", e.target.value)
                      }
                      className={styles.select}
                    >
                      <option value="public">Public - Anyone can see</option>
                      <option value="private">
                        Private - Only you can see
                      </option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>

                  <div className={styles.toggleItem}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>
                        Show Booking History
                      </div>
                      <div className={styles.toggleDesc}>
                        Allow others to see your past bookings
                      </div>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={settings.showBookingHistory}
                        onChange={(e) =>
                          handleInputChange(
                            "showBookingHistory",
                            e.target.checked
                          )
                        }
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                </div>

                <div className={styles.settingsGroup}>
                  <h3 className={styles.groupTitle}>Data Sharing</h3>

                  <div className={styles.toggleItem}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>
                        Share Data with Partners
                      </div>
                      <div className={styles.toggleDesc}>
                        Allow us to share your data with trusted partners
                      </div>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={settings.shareDataWithPartners}
                        onChange={(e) =>
                          handleInputChange(
                            "shareDataWithPartners",
                            e.target.checked
                          )
                        }
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                </div>

                <div className={styles.infoBox}>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <strong>Privacy Policy</strong>
                    <p>
                      Learn more about how we handle your data in our privacy
                      policy.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Security Settings</h2>
                <p className={styles.sectionDesc}>
                  Manage your account security and authentication
                </p>

                <div className={styles.settingsGroup}>
                  <h3 className={styles.groupTitle}>Authentication</h3>

                  <div className={styles.toggleItem}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>
                        Two-Factor Authentication
                      </div>
                      <div className={styles.toggleDesc}>
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) =>
                          handleInputChange("twoFactorAuth", e.target.checked)
                        }
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleItem}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>Login Alerts</div>
                      <div className={styles.toggleDesc}>
                        Get notified of new login attempts
                      </div>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={settings.loginAlerts}
                        onChange={(e) =>
                          handleInputChange("loginAlerts", e.target.checked)
                        }
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                </div>

                <div className={styles.settingsGroup}>
                  <h3 className={styles.groupTitle}>Password</h3>
                  <button className={styles.secondaryBtn}>
                    Change Password
                  </button>
                </div>

                <div className={styles.settingsGroup}>
                  <h3 className={styles.groupTitle}>Active Sessions</h3>
                  <p className={styles.groupDesc}>
                    Manage devices where you're currently logged in
                  </p>

                  <div className={styles.sessionCard}>
                    <div className={styles.sessionIcon}>💻</div>
                    <div className={styles.sessionInfo}>
                      <div className={styles.sessionDevice}>MacBook Pro</div>
                      <div className={styles.sessionLocation}>
                        Toronto, Canada • Current session
                      </div>
                    </div>
                    <button className={styles.sessionBtn}>Active</button>
                  </div>

                  <div className={styles.sessionCard}>
                    <div className={styles.sessionIcon}>📱</div>
                    <div className={styles.sessionInfo}>
                      <div className={styles.sessionDevice}>iPhone 14</div>
                      <div className={styles.sessionLocation}>
                        Toronto, Canada • Last active 2 hours ago
                      </div>
                    </div>
                    <button className={styles.sessionRevoke}>Revoke</button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className={styles.saveSection}>
              <button
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button className={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
