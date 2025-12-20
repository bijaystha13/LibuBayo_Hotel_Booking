import { useCallback, useReducer } from "react";

type FormInput = {
  value: string;
  isValid: boolean;
};

type FormState = {
  inputs: {
    [key: string]: FormInput;
  };
  isValid: boolean;
};

type FormAction =
  | {
      type: "INPUT_CHANGE";
      inputId: string;
      value: string;
      isValid: boolean;
    }
  | {
      type: "SET_MODE";
      inputs: { [key: string]: FormInput };
    }
  | {
      type: "SET_DATA";
      inputs: { [key: string]: FormInput };
      formIsValid: boolean;
    };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue;
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_MODE":
      return {
        ...state,
        inputs: action.inputs,
        isValid: false,
      };
    case "SET_DATA":
      return {
        ...state,
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
}

export function useForm(
  initialInputs: { [key: string]: FormInput },
  initialFormValidity: boolean
) {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
    },
    []
  );

  const setFormData = useCallback(
    (inputData: { [key: string]: FormInput }, formValidity: boolean) => {
      dispatch({
        type: "SET_DATA",
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData, dispatch] as const;
}
