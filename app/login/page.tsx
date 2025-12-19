"use client";

import React, { useState } from "react";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
  };

  return (
    <div className={styles.loginContainer}>
      {/* Background Elements */}
      <div className={styles.bgGradient}></div>
      <div className={styles.bgCircle1}></div>
      <div className={styles.bgCircle2}></div>

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        {/* Left Side - Branding */}
        <div className={styles.brandingSection}>
          <div className={styles.logoSection}>
            <span className={styles.logoIcon}>🏨</span>
            <div className={styles.logoText}>
              <h1 className={styles.brandName}>LuxeStay</h1>
              <p className={styles.brandTagline}>Discover Your Perfect Stay</p>
            </div>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🌟</span>
              <h3>Premium Hotels</h3>
              <p>Access to luxury accommodations worldwide</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>💰</span>
              <h3>Best Prices</h3>
              <p>Guaranteed lowest rates for your bookings</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🔒</span>
              <h3>Secure Booking</h3>
              <p>Your information is safe and encrypted</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>⚡</span>
              <h3>Instant Confirmation</h3>
              <p>Get booking confirmations immediately</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className={styles.formSubtitle}>
                {isSignUp
                  ? "Sign up to start booking your dream vacation"
                  : "Sign in to continue your journey"}
              </p>
            </div>

            <div className={styles.form}>
              {isSignUp && (
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Full Name
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>👤</span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>✉️</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🫣" : "🙈"}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className={styles.inputGroup}>
                  <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm Password
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className={styles.rememberForgot}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className={styles.forgotLink}>
                    Forgot Password?
                  </a>
                </div>
              )}

              <button onClick={handleSubmit} className={styles.submitBtn}>
                {isSignUp ? "Create Account" : "Sign In"}
              </button>

              <div className={styles.divider}>
                <span>OR</span>
              </div>

              <div className={styles.socialButtons}>
                <button type="button" className={styles.socialBtn}>
                  <span className={styles.socialIcon}>🔍</span>
                  Google
                </button>
                <button type="button" className={styles.socialBtn}>
                  <span className={styles.socialIcon}>📘</span>
                  Facebook
                </button>
              </div>
            </div>

            <div className={styles.toggleMode}>
              <p>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button onClick={toggleMode} className={styles.toggleBtn}>
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
