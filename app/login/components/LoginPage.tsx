"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import styles from "../LoginPage.module.css";

import { AuthContext } from "@/app/shared/Context/AuthContext";
import { useHttpClient } from "@/app/shared/hooks/httpHook";
import Modal from "@/app/shared/UIElements/Modal";
import Button from "@/app/shared/FormElements/Button";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import BrandingSection from "./BrandingSection";

// Define proper TypeScript interfaces
interface LoginResponseData {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  token: string;
  role?: string;
}

type SendRequestFunction = <T>(
  url: string,
  method?: string,
  body?: BodyInit | null,
  headers?: HeadersInit
) => Promise<T>;

export default function LoginPage() {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLoginSuccess = (responseData: LoginResponseData) => {
    // Provide a default value for role if it's undefined
    const userRole = responseData.role || responseData.user.role || "user";

    authCtx.login(
      responseData.user.id,
      responseData.token,
      responseData.user.name,
      userRole
    );

    setModalMessage("Login successful! Redirecting...");
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      router.push("/");
    }, 1500);
  };

  const handleSignupSuccess = () => {
    setModalMessage("Account created successfully! You can now sign in.");
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      toggleMode();
    }, 2000);
  };

  const handleError = (err: unknown) => {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Something went wrong. Please try again.";
    setModalMessage(errorMessage);
    setShowErrorModal(true);
    console.error("Request failed:", err);
  };

  const toggleMode = () => {
    clearError();
    setIsSignUp(!isSignUp);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    clearError();
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.bgGradient}></div>
      <div className={styles.bgCircle1}></div>
      <div className={styles.bgCircle2}></div>

      <div className={styles.contentWrapper}>
        <BrandingSection />

        <div className={styles.formSection}>
          <div className={styles.formCard}>
            {isSignUp ? (
              <SignupForm
                onSignupSuccess={handleSignupSuccess}
                onError={handleError}
                onSwitchToLogin={toggleMode}
                isLoading={isLoading}
                sendRequest={sendRequest as SendRequestFunction}
              />
            ) : (
              <LoginForm
                onLoginSuccess={handleLoginSuccess}
                onError={handleError}
                onSwitchToSignup={toggleMode}
                isLoading={isLoading}
                sendRequest={sendRequest as SendRequestFunction}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        show={showErrorModal}
        onCancel={handleCloseErrorModal}
        header="❌ Authentication Error"
        footer={<Button onClick={handleCloseErrorModal}>Close</Button>}
      >
        <p style={{ margin: 0, lineHeight: 1.6, fontSize: "1rem" }}>
          {modalMessage || error}
        </p>
      </Modal>

      <Modal
        show={showSuccessModal}
        onCancel={handleCloseSuccessModal}
        header="✅ Success"
        footer={<Button onClick={handleCloseSuccessModal}>OK</Button>}
      >
        <p style={{ margin: 0, lineHeight: 1.6, fontSize: "1rem" }}>
          {modalMessage}
        </p>
      </Modal>
    </div>
  );
}
