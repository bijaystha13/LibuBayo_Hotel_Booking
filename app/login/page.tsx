// "use client";

// import React, { useState } from "react";
// import styles from "./LoginPage.module.css";
// import Input from "../shared/FormElements/Input";
// import {
//   VALIDATOR_MINLENGTH,
//   VALIDATOR_REQUIRE,
//   VALIDATOR_EMAIL,
// } from "../shared/util/validators";
// import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
// import Button from "../shared/FormElements/Button";
// import { useForm } from "../shared/hooks/formHook";

// export default function LoginPage() {
//   const [formState, inputHandler, dispatch] = useForm(
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
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!formState.isValid) return;

//     try {
//       setIsLoading(true);

//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       console.log(isSignUp ? "Signing up" : "Signing in", formState.inputs);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleMode = () => {
//     if (!isSignUp) {
//       dispatch({
//         type: "SET_MODE",
//         inputs: {
//           name: { value: "", isValid: false },
//           email: { value: "", isValid: false },
//           password: { value: "", isValid: false },
//           confirmPassword: { value: "", isValid: false },
//         },
//       });
//     } else {
//       dispatch({
//         type: "SET_MODE",
//         inputs: {
//           email: { value: "", isValid: false },
//           password: { value: "", isValid: false },
//         },
//       });
//     }
//     setIsSignUp(!isSignUp);
//   };

//   return (
//     <div className={styles.loginContainer}>
//       {/* Background Elements */}
//       <div className={styles.bgGradient}></div>
//       <div className={styles.bgCircle1}></div>
//       <div className={styles.bgCircle2}></div>

//       {/* Main Content */}
//       <div className={styles.contentWrapper}>
//         {/* Left Side - Branding */}
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

//         {/* Right Side - Login Form */}
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
//               />

//               <Input
//                 id="password"
//                 element="input"
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 required={true}
//                 icon={<FaLock />}
//                 placeholder="Enter your password"
//                 errorText="Password must be at least 6 characters"
//                 validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
//                 onInput={inputHandler}
//               />

//               {isSignUp && (
//                 <Input
//                   id="confirmPassword"
//                   element="input"
//                   label="Confirm Password"
//                   type={showPassword ? "text" : "password"}
//                   required={true}
//                   icon={<FaLock />}
//                   placeholder="Confirm your password"
//                   errorText="Password must be at least 6 characters"
//                   validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
//                   onInput={inputHandler}
//                 />
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

//               {/* <button
//                 type="submit"
//                 className={styles.submitBtn}
//                 disabled={!formState.isValid}
//               >
//                 {isSignUp ? "Create Account" : "Sign In"}
//               </button> */}

//               <Button
//                 className={styles.submitBtn}
//                 disabled={!formState.isValid}
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
//                   <span className={styles.socialIcon}>🔍</span>
//                   Google
//                 </button>
//                 <button type="button" className={styles.socialBtn}>
//                   <span className={styles.socialIcon}>📘</span>
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

import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import Input from "../shared/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../shared/util/validators";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Button from "../shared/FormElements/Button";
import { useForm } from "../shared/hooks/formHook";

export default function LoginPage() {
  const [formState, inputHandler] = useForm(
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

  const { isValid } = formState;
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;

    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(isSignUp ? "Signing up" : "Signing in", formState.inputs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    if (!isSignUp) {
      inputHandler("name", "", false);
    }
    inputHandler("email", "", false);
    inputHandler("password", "", false);
    if (isSignUp) {
      inputHandler("confirmPassword", "", false);
    }

    setIsSignUp(!isSignUp);
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
              />

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
              />

              {isSignUp && (
                <Input
                  id="confirmPassword"
                  element="input"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  required={true}
                  icon={<FaLock />}
                  placeholder="Confirm your password"
                  errorText="Password must be at least 6 characters"
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                  onInput={inputHandler}
                />
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
                disabled={!formState.isValid}
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
                  <span className={styles.socialIcon}>🔍</span>
                  Google
                </button>
                <button type="button" className={styles.socialBtn}>
                  <span className={styles.socialIcon}>📘</span>
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
    </div>
  );
}
