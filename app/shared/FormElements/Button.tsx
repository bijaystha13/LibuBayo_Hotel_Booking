import React, { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  href?: string;
  size?: "small" | "default" | "large";
  inverse?: boolean;
  danger?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: ReactNode;
  loading?: boolean;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const buttonClasses = `
    ${styles.button}
    ${styles[`button--${props.size || "default"}`]}
    ${props.inverse ? styles["button--inverse"] : ""}
    ${props.danger ? styles["button--danger"] : ""}
    ${props.loading ? styles["button--loading"] : ""}
    ${props.className || ""} // Add this line
  `.trim();

  if (props.href) {
    return (
      <Link href={props.href} className={buttonClasses}>
        {props.loading ? "Loading..." : props.children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      aria-busy={props.loading}
    >
      {props.loading ? <span className={styles.spinner} /> : props.children}
    </button>
  );
}
