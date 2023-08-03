import { Reducer } from "react";

export enum EOperators {
  "divide" = "/", // good for aria labels
  "multiply" = "*",
  "subtract" = "-",
  "add" = "+",
  "result" = "=" // or equals?
}

type TState = {
  // display: string; // optional?
  firstOperandOrResult?: number;
  secondOperand?: number;
  operator?: EOperators;
  lastUpdated?: "firstOperandOrResult" | "secondOperand" | "operator" | "sum";
  error?: boolean; // didn't know how to split this into separate state but works fine?
};

// {type: "display_number"; payload: number}
// can i make the payload  type numeric values??
type TAction =
  | { type: "number"; payload: number }
  | { type: "operator"; payload: EOperators }
  | { type: "sign_inversion" }
  | { type: "clear_last_value" }
  | { type: "clear_all" }; // why snake_case

const initialState: TState = {
  // display: "" // do I need this
};

const tryRoundingDecimalPlaces = (sum: number) => {
  if (Math.round(sum) - sum === 0) {
    return sum;
  } else {
    const newSum = Math.round(sum * 1000) / 1000;
    return newSum;
  }
};

const calculatorReducer: Reducer<TState, TAction> = (state, action) => {
  switch (action.type) {
    case "number":
      if (state.lastUpdated === "sum") {
        state = initialState;
      }
      state.error = false; // after
      if (state.operator) {
        // nested if statements ok?
        if (!state.secondOperand && state.secondOperand !== 0) {
          return { ...state, secondOperand: action.payload, lastUpdated: "secondOperand" };
        } else if (state.secondOperand.toString().length < 8) {
          const singleValue = parseInt([state.secondOperand, action.payload].join(""));
          return { ...state, secondOperand: singleValue, lastUpdated: "secondOperand" };
        }
        return { ...state }; // i think: needed b/c o/w it will try to update the firstOperand
      }
      if (!state.firstOperandOrResult && state.firstOperandOrResult !== 0) {
        return { ...state, firstOperandOrResult: action.payload, lastUpdated: "firstOperandOrResult" };
      } else if (state.firstOperandOrResult.toString().length < 8) {
        const singleValue = parseInt([state.firstOperandOrResult, action.payload].join(""));
        return { ...state, firstOperandOrResult: singleValue, lastUpdated: "firstOperandOrResult" };
      }
      return { ...state }; // default here?

    case "operator":
      // see if calculation possible, o/w just store operator
      if (
        state.operator &&
        (state.secondOperand || state.secondOperand === 0) &&
        (state.firstOperandOrResult || state.firstOperandOrResult === 0)
      ) {
        // checking if first too jic some weird error occurs
        // nested switch-case or pass in payload here?
        let sum =
          state.operator === EOperators["divide"]
            ? state.firstOperandOrResult / state.secondOperand
            : state.operator === EOperators["multiply"]
            ? state.firstOperandOrResult * state.secondOperand
            : state.operator === EOperators["subtract"]
            ? state.firstOperandOrResult - state.secondOperand
            : state.operator === EOperators["add"]
            ? state.firstOperandOrResult + state.secondOperand
            : 0; // shouldn't get here // expect default to be sum?

        if (sum.toString().length > 8) {
          // better to use 'let' sum or rename value?
          sum = tryRoundingDecimalPlaces(sum);
          if (sum.toString().length > 8) {
            state = initialState;
            console.log("logged error state");
            return { ...state, error: true };
          }
        }
        return {
          ...state,
          firstOperandOrResult: sum,
          secondOperand: undefined,
          operator: action.payload,
          lastUpdated: "sum"
        };
      }
      if (!state.firstOperandOrResult) {
        return initialState; // don't just apply changes to second value if there isn't a first value
      }
      return { ...state, operator: action.payload, lastUpdated: "operator" }; // is last updated needed - yes b/c o/w will wipe out number!

    case "sign_inversion":
      if (state.secondOperand) {
        return { ...state, secondOperand: state.secondOperand * -1 };
      }
      if (state.firstOperandOrResult) {
        return { ...state, firstOperandOrResult: state.firstOperandOrResult * -1 };
      }

      return { ...state };

    case "clear_last_value":
      if (state.lastUpdated === "firstOperandOrResult") {
        return { ...state, firstOperandOrResult: undefined, lastUpdated: undefined };
      } else if (state.lastUpdated === "secondOperand") {
        return { ...state, secondOperand: undefined, lastUpdated: undefined };
      } else if (state.lastUpdated === "operator") {
        return { ...state, operator: undefined, lastUpdated: undefined };
      }
      return state;

    case "clear_all":
      return initialState; // do I need to set the state as initial state?

    default: // IF NUMBER BUT MORE THAN 7 CHARACTERS, should be covered above
      console.log("how did you get here", state);
      return state;
  }
};

export default calculatorReducer;
