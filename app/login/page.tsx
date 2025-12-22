// "use client";

// import React, { useState, useContext } from "react";
// import styles from "./LoginPage.module.css";
// import Input from "../shared/FormElements/Input";
// import {
//   VALIDATOR_MINLENGTH,
//   VALIDATOR_REQUIRE,
//   VALIDATOR_EMAIL,
// } from "../shared/util/validators";
// import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
// import Button from "../shared/FormElements/Button";
// import { useForm } from "../shared/hooks/formHook";
// import { FaFacebookF, FaGoogle } from "react-icons/fa6";
// import { AuthContext } from "../shared/Context/AuthContext";
// import { useHttpClient } from "../shared/hooks/httpHook";

// export default function LoginPage() {
//   const authCtx = useContext(AuthContext);
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();
//   const [formState, inputHandler, setFormData] = useForm(
//     {
//       email: {
//         value: "",
//         isValid: false,
//       },
//       password: {
//         value: "",
//         isValid: false,
//       },
//     },
//     false
//   );
//   const [isSignUp, setIsSignUp] = useState(false);

//   // const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordsMatch, setPasswordsMatch] = useState(true);
//   const [showPasswordError, setShowPasswordError] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   //   event.preventDefault();
//   //   if (isSignUp) {
//   //     const password = formState.inputs.password?.value || "";
//   //     const confirmPassword = formState.inputs.confirmPassword?.value || "";
//   //     const doPasswordsMatch = password === confirmPassword;
//   //     setPasswordsMatch(doPasswordsMatch);

//   //     if (!doPasswordsMatch) {
//   //       setShowPasswordError(true);
//   //       return;
//   //     }
//   //   }

//   //   setShowPasswordError(false);

//   //   if (!formState.isValid) return;

//   //   try {
//   //     setIsLoading(true);

//   //     await new Promise((resolve) => setTimeout(resolve, 1500));

//   //     console.log(isSignUp ? "Signing up" : "Signing in", formState.inputs);
//   //   } catch (err) {
//   //     console.error(err);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   //   authCtx.login();
//   // };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (isSignUp) {
//       const password = formState.inputs.password?.value || "";
//       const confirmPassword = formState.inputs.confirmPassword?.value || "";
//       const doPasswordsMatch = password === confirmPassword;
//       setPasswordsMatch(doPasswordsMatch);

//       if (!doPasswordsMatch) {
//         setShowPasswordError(true);
//         return;
//       }
//     }

//     setShowPasswordError(false);

//     if (!formState.isValid) return;

//     try {
//       let responseData;

//       if (isSignUp) {
//         // Sign up request
//         responseData = await sendRequest(
//           "http://localhost:5002/api/users/signup", // Replace with your backend URL
//           "POST",
//           JSON.stringify({
//             name: formState.inputs.name?.value,
//             email: formState.inputs.email?.value,
//             password: formState.inputs.password?.value,
//           }),
//           {
//             "Content-Type": "application/json",
//           }
//         );
//       } else {
//         // Login request
//         responseData = await sendRequest(
//           "http://localhost:5002/api/users/login", // Replace with your backend URL
//           "POST",
//           JSON.stringify({
//             email: formState.inputs.email?.value,
//             password: formState.inputs.password?.value,
//           }),
//           {
//             "Content-Type": "application/json",
//           }
//         );
//       }

//       // Handle successful response
//       console.log("Response:", responseData);
//       authCtx.login(); // You might want to pass user data or token here
//     } catch (err) {
//       // Error is already handled by the httpHook
//       console.error("Request failed:", err);
//     }
//   };

//   const toggleMode = () => {
//     setShowPasswordError(false);
//     setPasswordsMatch(true);

//     if (!isSignUp) {
//       setFormData(
//         {
//           name: { value: "", isValid: false },
//           email: { value: "", isValid: false },
//           password: { value: "", isValid: false },
//           confirmPassword: { value: "", isValid: false },
//         },
//         false
//       );
//     } else {
//       setFormData(
//         {
//           email: { value: "", isValid: false },
//           password: { value: "", isValid: false },
//         },
//         false
//       );
//     }
//     setIsSignUp(!isSignUp);
//   };

//   const isFormValid = () => {
//     if (!isSignUp) {
//       return (
//         formState.inputs.email?.isValid && formState.inputs.password?.isValid
//       );
//     } else {
//       return (
//         formState.inputs.name?.isValid &&
//         formState.inputs.email?.isValid &&
//         formState.inputs.password?.isValid &&
//         formState.inputs.confirmPassword?.isValid
//       );
//     }
//   };

//   return (
//     <div className={styles.loginContainer}>
//       <div className={styles.bgGradient}></div>
//       <div className={styles.bgCircle1}></div>
//       <div className={styles.bgCircle2}></div>

//       <div className={styles.contentWrapper}>
//         <div className={styles.brandingSection}>
//           <div className={styles.logoSection}>
//             <span className={styles.logoIcon}>🏨</span>
//             <div className={styles.logoText}>
//               <h1 className={styles.brandName}>LuxeStay</h1>
//               <p className={styles.brandTagline}>Discover Your Perfect Stay</p>
//             </div>
//           </div>

//           <div className={styles.featuresGrid}>
//             <div className={styles.featureCard}>
//               <span className={styles.featureIcon}>🌟</span>
//               <h3>Premium Hotels</h3>
//               <p>Access to luxury accommodations worldwide</p>
//             </div>
//             <div className={styles.featureCard}>
//               <span className={styles.featureIcon}>💰</span>
//               <h3>Best Prices</h3>
//               <p>Guaranteed lowest rates for your bookings</p>
//             </div>
//             <div className={styles.featureCard}>
//               <span className={styles.featureIcon}>🔒</span>
//               <h3>Secure Booking</h3>
//               <p>Your information is safe and encrypted</p>
//             </div>
//             <div className={styles.featureCard}>
//               <span className={styles.featureIcon}>⚡</span>
//               <h3>Instant Confirmation</h3>
//               <p>Get booking confirmations immediately</p>
//             </div>
//           </div>
//         </div>

//         <div className={styles.formSection}>
//           <div className={styles.formCard}>
//             <div className={styles.formHeader}>
//               <h2 className={styles.formTitle}>
//                 {isSignUp ? "Create Account" : "Welcome Back"}
//               </h2>
//               <p className={styles.formSubtitle}>
//                 {isSignUp
//                   ? "Sign up to start booking your dream vacation"
//                   : "Sign in to continue your journey"}
//               </p>
//             </div>

//             <form className={styles.form} onSubmit={handleSubmit}>
//               {isSignUp && (
//                 <Input
//                   element="input"
//                   id="name"
//                   label="Full Name"
//                   type="text"
//                   icon={<FaUser />}
//                   placeholder="Enter your name"
//                   required={true}
//                   validators={[VALIDATOR_REQUIRE()]}
//                   errorText="Please provide your name"
//                   onInput={inputHandler}
//                   value={formState.inputs.name?.value || ""}
//                 />
//               )}

//               <Input
//                 id="email"
//                 element="input"
//                 label="Email Address"
//                 type="email"
//                 required={true}
//                 icon={<FaEnvelope />}
//                 placeholder="Enter your email"
//                 validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
//                 errorText="Please provide a valid email address"
//                 onInput={inputHandler}
//                 value={formState.inputs.email?.value || ""}
//               />

//               <div className={styles.passwordWrapper}>
//                 <Input
//                   id="password"
//                   element="input"
//                   label="Password"
//                   type={showPassword ? "text" : "password"}
//                   required={true}
//                   icon={<FaLock />}
//                   placeholder="Enter your password"
//                   errorText="Password must be at least 6 characters"
//                   validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
//                   onInput={inputHandler}
//                   value={formState.inputs.password?.value || ""}
//                 />
//                 <button
//                   type="button"
//                   className={styles.eyeButton}
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>

//               {isSignUp && (
//                 <>
//                   <div className={styles.passwordWrapper}>
//                     <Input
//                       id="confirmPassword"
//                       element="input"
//                       label="Confirm Password"
//                       type={showConfirmPassword ? "text" : "password"}
//                       required={true}
//                       icon={<FaLock />}
//                       placeholder="Confirm your password"
//                       errorText="Password must be at least 6 characters"
//                       validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
//                       onInput={inputHandler}
//                       value={formState.inputs.confirmPassword?.value || ""}
//                     />
//                     <button
//                       type="button"
//                       className={styles.eyeButton}
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                       aria-label={
//                         showConfirmPassword ? "Hide password" : "Show password"
//                       }
//                     >
//                       {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>
//                   {showPasswordError && !passwordsMatch && (
//                     <p className={styles.errorText}>Passwords do not match</p>
//                   )}
//                 </>
//               )}

//               {!isSignUp && (
//                 <div className={styles.rememberForgot}>
//                   <label className={styles.checkboxLabel}>
//                     <input type="checkbox" className={styles.checkbox} />
//                     <span>Remember me</span>
//                   </label>
//                   <a href="#" className={styles.forgotLink}>
//                     Forgot Password?
//                   </a>
//                 </div>
//               )}

//               <Button
//                 className={styles.submitBtn}
//                 // disabled={!formState.isValid}
//                 disabled={!isFormValid()}
//                 type="submit"
//                 loading={isLoading}
//               >
//                 {isSignUp ? "Create Account" : "Sign In"}
//               </Button>

//               <div className={styles.divider}>
//                 <span>OR</span>
//               </div>

//               <div className={styles.socialButtons}>
//                 <button type="button" className={styles.socialBtn}>
//                   <span className={styles.socialIcon}>
//                     <FaGoogle />
//                   </span>
//                   Google
//                 </button>
//                 <button type="button" className={styles.socialBtn}>
//                   <span className={styles.socialIcon}>
//                     <FaFacebookF />
//                   </span>
//                   Facebook
//                 </button>
//               </div>
//             </form>

//             <div className={styles.toggleMode}>
//               <p>
//                 {isSignUp
//                   ? "Already have an account?"
//                   : "Don't have an account?"}{" "}
//                 <button onClick={toggleMode} className={styles.toggleBtn}>
//                   {isSignUp ? "Sign In" : "Sign Up"}
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useContext } from "react";
import styles from "./LoginPage.module.css";
import Input from "../shared/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../shared/util/validators";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../shared/FormElements/Button";
import { useForm } from "../shared/hooks/formHook";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../shared/Context/AuthContext";
import { useHttpClient } from "../shared/hooks/httpHook";
import Modal from "../shared/UIElements/Modal";

export default function LoginPage() {
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modal states
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSignUp) {
      const password = formState.inputs.password?.value || "";
      const confirmPassword = formState.inputs.confirmPassword?.value || "";
      const doPasswordsMatch = password === confirmPassword;
      setPasswordsMatch(doPasswordsMatch);

      if (!doPasswordsMatch) {
        setShowPasswordError(true);
        return;
      }
    }

    setShowPasswordError(false);

    if (!formState.isValid) return;

    try {
      let responseData;

      if (isSignUp) {
        // Sign up request
        responseData = await sendRequest(
          "http://localhost:5002/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name?.value,
            email: formState.inputs.email?.value,
            password: formState.inputs.password?.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        // Show success message for signup
        setModalMessage("Account created successfully! You can now sign in.");
        setShowSuccessModal(true);

        // Switch to login mode after successful signup
        setTimeout(() => {
          setShowSuccessModal(false);
          toggleMode();
        }, 2000);
      } else {
        // Login request
        responseData = await sendRequest(
          "http://localhost:5002/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email?.value,
            password: formState.inputs.password?.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        // Handle successful login
        console.log("Response:", responseData);

        // Show success message
        setModalMessage("Login successful! Redirecting...");
        setShowSuccessModal(true);

        // Login after short delay
        setTimeout(() => {
          authCtx.login(); // Pass user data or token if needed
        }, 1500);
      }
    } catch (err) {
      // Show error in modal
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setModalMessage(errorMessage);
      setShowErrorModal(true);
      console.error("Request failed:", err);
    }
  };

  const toggleMode = () => {
    setShowPasswordError(false);
    setPasswordsMatch(true);
    clearError();

    if (!isSignUp) {
      setFormData(
        {
          name: { value: "", isValid: false },
          email: { value: "", isValid: false },
          password: { value: "", isValid: false },
          confirmPassword: { value: "", isValid: false },
        },
        false
      );
    } else {
      setFormData(
        {
          email: { value: "", isValid: false },
          password: { value: "", isValid: false },
        },
        false
      );
    }
    setIsSignUp(!isSignUp);
  };

  const isFormValid = () => {
    if (!isSignUp) {
      return (
        formState.inputs.email?.isValid && formState.inputs.password?.isValid
      );
    } else {
      return (
        formState.inputs.name?.isValid &&
        formState.inputs.email?.isValid &&
        formState.inputs.password?.isValid &&
        formState.inputs.confirmPassword?.isValid
      );
    }
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

            <form className={styles.form} onSubmit={handleSubmit}>
              {isSignUp && (
                <Input
                  element="input"
                  id="name"
                  label="Full Name"
                  type="text"
                  icon={<FaUser />}
                  placeholder="Enter your name"
                  required={true}
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please provide your name"
                  onInput={inputHandler}
                  value={formState.inputs.name?.value || ""}
                />
              )}

              <Input
                id="email"
                element="input"
                label="Email Address"
                type="email"
                required={true}
                icon={<FaEnvelope />}
                placeholder="Enter your email"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                errorText="Please provide a valid email address"
                onInput={inputHandler}
                value={formState.inputs.email?.value || ""}
              />

              <div className={styles.passwordWrapper}>
                <Input
                  id="password"
                  element="input"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required={true}
                  icon={<FaLock />}
                  placeholder="Enter your password"
                  errorText="Password must be at least 6 characters"
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                  onInput={inputHandler}
                  value={formState.inputs.password?.value || ""}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {isSignUp && (
                <>
                  <div className={styles.passwordWrapper}>
                    <Input
                      id="confirmPassword"
                      element="input"
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      required={true}
                      icon={<FaLock />}
                      placeholder="Confirm your password"
                      errorText="Password must be at least 6 characters"
                      validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                      onInput={inputHandler}
                      value={formState.inputs.confirmPassword?.value || ""}
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {showPasswordError && !passwordsMatch && (
                    <p className={styles.errorText}>Passwords do not match</p>
                  )}
                </>
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

              <Button
                className={styles.submitBtn}
                disabled={!isFormValid()}
                type="submit"
                loading={isLoading}
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>

              <div className={styles.divider}>
                <span>OR</span>
              </div>

              <div className={styles.socialButtons}>
                <button type="button" className={styles.socialBtn}>
                  <span className={styles.socialIcon}>
                    <FaGoogle />
                  </span>
                  Google
                </button>
                <button type="button" className={styles.socialBtn}>
                  <span className={styles.socialIcon}>
                    <FaFacebookF />
                  </span>
                  Facebook
                </button>
              </div>
            </form>

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

      {/* Error Modal */}
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

      {/* Success Modal */}
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
