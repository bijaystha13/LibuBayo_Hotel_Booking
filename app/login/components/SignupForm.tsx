"use client";

import React, { useState } from "react";
import { useForm } from "@/app/shared/hooks/formHook";
import Input from "@/app/shared/FormElements/Input";
import Button from "@/app/shared/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import styles from "../LoginPage.module.css";

// Define proper TypeScript interfaces
interface SignupResponseData {
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

interface SignupFormProps {
  onSignupSuccess: () => void;
  onError: (error: Error | string) => void;
  onSwitchToLogin: () => void;
  isLoading: boolean;
  sendRequest: SendRequestFunction;
}

export default function SignupForm({
  onSignupSuccess,
  onError,
  onSwitchToLogin,
  isLoading,
  sendRequest,
}: SignupFormProps) {
  // useForm returns 4 values: [formState, inputHandler, setFormData, dispatch]
  const [formState, inputHandler, setFormData, dispatch] = useForm(
    {
      name: { value: "", isValid: false },
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      confirmPassword: { value: "", isValid: false },
    },
    false
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const password = formState.inputs.password?.value || "";
    const confirmPassword = formState.inputs.confirmPassword?.value || "";
    const doPasswordsMatch = password === confirmPassword;
    setPasswordsMatch(doPasswordsMatch);

    if (!doPasswordsMatch) {
      setShowPasswordError(true);
      return;
    }

    setShowPasswordError(false);

    if (!formState.isValid) return;

    try {
      const responseData = await sendRequest<SignupResponseData>(
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

      console.log("Signup Response:", responseData);
      onSignupSuccess();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      onError(error);
    }
  };

  const isFormValid = () => {
    return (
      formState.inputs.name?.isValid &&
      formState.inputs.email?.isValid &&
      formState.inputs.password?.isValid &&
      formState.inputs.confirmPassword?.isValid
    );
  };

  return (
    <>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Create Account</h2>
        <p className={styles.formSubtitle}>
          Sign up to start booking your dream vacation
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
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
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {showPasswordError && !passwordsMatch && (
          <p className={styles.errorText}>Passwords do not match</p>
        )}

        <Button
          className={styles.submitBtn}
          disabled={!isFormValid()}
          type="submit"
          loading={isLoading}
        >
          Create Account
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

        <div className={styles.toggleMode}>
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className={styles.toggleBtn}
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </>
  );
}
