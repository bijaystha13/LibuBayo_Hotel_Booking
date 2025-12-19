"use client";

import React, { useState } from "react";
import styles from "./LoginPage.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = () => {
    console.log({ email, password, rememberMe });
  };

  const socialLogins = [
    { name: "Google", icon: "🔍", color: "#4285f4" },
    { name: "Facebook", icon: "📘", color: "#1877f2" },
    { name: "Apple", icon: "🍎", color: "#000000" },
  ];

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        {/* Left Side - Login Form */}
        <div className={styles.loginBox}>
          <div className={styles.loginHeader}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>🏨</span>
              <span className={styles.logoText}>LuxuryStay</span>
            </div>
            <h1 className={styles.loginTitle}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className={styles.loginSubtitle}>
              {isLogin
                ? "Sign in to access your bookings and exclusive deals"
                : "Join us and start your luxury journey today"}
            </p>
          </div>

          <div className={styles.loginForm}>
            {/* Social Login Buttons */}
            <div className={styles.socialLogins}>
              {socialLogins.map((social, index) => (
                <button key={index} className={styles.socialButton}>
                  <span className={styles.socialIcon}>{social.icon}</span>
                </button>
              ))}
            </div>

            <div className={styles.divider}>
              <span className={styles.dividerText}>or continue with email</span>
            </div>

            {/* Email Input */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email Address</label>
              <div className={styles.inputWrapper}>
                <svg
                  className={styles.inputIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Password</label>
              <div className={styles.inputWrapper}>
                <svg
                  className={styles.inputIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            {isLogin && (
              <div className={styles.formOptions}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <button className={styles.forgotPassword}>
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button className={styles.submitButton} onClick={handleSubmit}>
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            {/* Toggle Login/Signup */}
            <div className={styles.toggleAuth}>
              <span className={styles.toggleText}>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
              <button
                className={styles.toggleButton}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className={styles.terms}>
            <p>
              By continuing, you agree to our{" "}
              <a href="#" className={styles.termsLink}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className={styles.termsLink}>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Right Side - Info Panel */}
        <div className={styles.infoPanel}>
          <div className={styles.infoPanelContent}>
            <div className={styles.infoPanelOverlay} />
            <div className={styles.infoPanelText}>
              <h2 className={styles.infoPanelTitle}>
                Your Journey to Luxury Awaits
              </h2>
              <p className={styles.infoPanelDescription}>
                Join thousands of travelers who trust LuxuryStay for their
                perfect vacation experiences.
              </p>
              <div className={styles.features}>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>🎯</div>
                  <div>
                    <h3 className={styles.featureTitle}>Exclusive Deals</h3>
                    <p className={styles.featureText}>
                      Access members-only rates and special offers
                    </p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>⭐</div>
                  <div>
                    <h3 className={styles.featureTitle}>Reward Points</h3>
                    <p className={styles.featureText}>
                      Earn points with every booking you make
                    </p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>🏆</div>
                  <div>
                    <h3 className={styles.featureTitle}>Priority Support</h3>
                    <p className={styles.featureText}>
                      24/7 dedicated customer service team
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
