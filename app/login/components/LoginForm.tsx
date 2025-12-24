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
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import styles from "../LoginPage.module.css";

// Define types for API response
export type UserData = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export type LoginResponse = {
  user: UserData;
  token: string;
  role?: string;
};

// Generic type for sendRequest function
export type SendRequestFunction = <T>(
  url: string,
  method?: string,
  body?: BodyInit | null,
  headers?: HeadersInit
) => Promise<T>;

interface LoginFormProps {
  onLoginSuccess: (responseData: LoginResponse) => void;
  onError: (error: Error | string) => void;
  onSwitchToSignup: () => void;
  isLoading: boolean;
  sendRequest: SendRequestFunction;
}

export default function LoginForm({
  onLoginSuccess,
  onError,
  onSwitchToSignup,
  isLoading,
  sendRequest,
}: LoginFormProps) {
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

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.isValid) return;

    try {
      const responseData = await sendRequest<LoginResponse>(
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

      console.log("Login Response:", responseData);
      onLoginSuccess(responseData);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      onError(error);
    }
  };

  const isFormValid = () => {
    return (
      formState.inputs.email?.isValid && formState.inputs.password?.isValid
    );
  };

  return (
    <>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Welcome Back</h2>
        <p className={styles.formSubtitle}>Sign in to continue your journey</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
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

        <div className={styles.rememberForgot}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} />
            <span>Remember me</span>
          </label>
          <a href="#" className={styles.forgotLink}>
            Forgot Password?
          </a>
        </div>

        <Button
          className={styles.submitBtn}
          disabled={!isFormValid()}
          type="submit"
          loading={isLoading}
        >
          Sign In
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
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className={styles.toggleBtn}
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </>
  );
}
