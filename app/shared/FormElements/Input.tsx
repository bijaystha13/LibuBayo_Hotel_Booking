import React, { useEffect, useReducer } from "react";
import { validate, Validator } from "../util/validators";
import styles from "./Input.module.css";

interface InputProps {
  element: "input" | "textarea";
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  icon?: React.ReactNode;
  errorText?: string;
  required?: boolean;
  validateOn?: "change" | "blur" | "submit";
  validators?: Validator[];
  onInput: (id: string, value: string, isValid: boolean) => void;
}

interface InputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

interface InputAction {
  type: "CHANGE" | "BLUR";
  val?: string;
  validators?: Validator[];
}

function inputReducer(state: InputState, action: InputAction) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val || "",
        isValid: action.validators
          ? validate(action.val || "", action.validators)
          : true,
      };
    case "BLUR":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
}

export default function Input(props: InputProps) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: props.validators ? false : true,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const showError = !inputState.isValid && inputState.isTouched;

  function changeHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  }

  function blurHandler() {
    dispatch({ type: "BLUR" });
  }

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={inputState.value}
        className={styles.input}
        required={props.required}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={inputState.value}
        className={styles.textarea}
        placeholder={props.placeholder}
        required={props.required}
      />
    );

  return (
    <div
      className={`${styles["form-control"]} ${showError ? styles.error : ""}`}
    >
      <label htmlFor={props.id}>
        {props.label}
        {props.required && <span className={styles.required}> *</span>}
      </label>
      <div className={styles["input-wrapper"]}>
        {props.icon && (
          <span className={styles["input-icon"]}>{props.icon}</span>
        )}
        {element}
        {/* {!inputState.isValid && inputState.isTouched && (
          <p>{props.errorText}</p>
        )} */}
      </div>
      {showError && props.errorText && (
        <span className={styles["error-message"]}>{props.errorText}</span>
      )}
    </div>
  );
}
