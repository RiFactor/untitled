import { Reducer, useReducer, useState } from "react";

// Answered -- do  extract calculations out of this component- separate display logic
// LOGIC to cover: essentially clear operations when typing new number when first result saved

const numericValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // leave these as they are, not enum
const reverseNumericValues = numericValues.reverse();

enum EOperators {
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

const reducer: Reducer<TState, TAction> = (state, action) => {
  switch (action.type) {
    case "number":
      if (state.lastUpdated === "sum") {
        state = initialState;
      }
      state.error = false; // after
      console.log(state, "number entered");
      if (state.operator) {
        // nested if statements ok?
        if (!state.secondOperand) {
          return { ...state, secondOperand: action.payload, lastUpdated: "secondOperand" };
        } else if (state.secondOperand.toString().length < 8) {
          const singleValue = parseInt([state.secondOperand, action.payload].join(""));
          return { ...state, secondOperand: singleValue, lastUpdated: "secondOperand" };
        }
        return { ...state }; // i think: needed b/c o/w it will try to update the firstOperand
      }
      if (!state.firstOperandOrResult) {
        return { ...state, firstOperandOrResult: action.payload, lastUpdated: "firstOperandOrResult" };
      } else if (state.firstOperandOrResult.toString().length < 8) {
        const singleValue = parseInt([state.firstOperandOrResult, action.payload].join(""));
        return { ...state, firstOperandOrResult: singleValue, lastUpdated: "firstOperandOrResult" };
      }
      return { ...state }; // default here?

    case "operator":
      console.log(state, "operator entered");
      // see if calculation possible, o/w just store operator
      if (state.operator && state.secondOperand && state.firstOperandOrResult) {
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
            : 0; // shouldn't get here
        // expect default to be sum?

        if (sum.toString().length > 8) {
          // better to use let sum or rename value?
          sum = tryRoundingDecimalPlaces(sum);
          if (sum.toString().length > 8) {
            state = initialState;
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
      console.log("+/-");
      if (state.secondOperand) {
        console.log(state);
        return { ...state, secondOperand: state.secondOperand * -1 };
      }
      if (state.firstOperandOrResult) {
        console.log(state);
        return { ...state, firstOperandOrResult: state.firstOperandOrResult * -1 };
      }

      return { ...state };

    case "clear_last_value":
      console.log(state, "clear last value");
      if (state.lastUpdated === "firstOperandOrResult") {
        return { ...state, firstOperandOrResult: undefined, lastUpdated: undefined };
      } else if (state.lastUpdated === "secondOperand") {
        return { ...state, secondOperand: undefined, lastUpdated: undefined };
      } else if (state.lastUpdated === "operator") {
        return { ...state, operator: undefined, lastUpdated: undefined };
      }
      return state;

    case "clear_all":
      console.log(state);
      return initialState; // do I need to set the state as initial state?

    default: // IF NUMBER BUT MORE THAN 7 CHARACTERS
      console.log("how did you get here", state);
      return state;
  }
};

// ***
// *** OLD CODE HERE ***
// ***

// window.addEventListener("keydown"); // Answered -- want to get key event listeners (using window b/c nt specific text field) // ensure event listener stops when on diff route useeffect w/ cleanup

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(Boolean);

  // const arrayOfOperators = Object.keys(EOperators) as EOperators[]; // alternate TS solution

  return (
    <>
      <div className="m-4 flex max-w-[250px] flex-col gap-2 rounded border-2 p-4 dark:border-neutral-400">
        <h2 className="mb-3 rounded border-2 border-neutral-400 p-3.5 text-right text-4xl font-bold leading-8 tracking-tight">
          {
            // switch-case
            state.error
              ? "ERR"
              : state.secondOperand
              ? state.secondOperand
              : state.firstOperandOrResult
              ? state.firstOperandOrResult
              : 0
          }
        </h2>
        <div className="flex flex-row gap-4">
          <div className="numbers-and-operators flex flex-col gap-4">
            {/* pl-2 is a hack */}
            <div className="flex gap-4 pl-2">
              <button
                className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                onClick={() => {
                  dispatch({ type: "clear_all" });
                }}
              >
                AC
              </button>
              <button
                className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                onClick={() => dispatch({ type: "clear_last_value" })}
              >
                C
              </button>
              <button
                className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                onClick={() => {
                  dispatch({ type: "sign_inversion" });
                }}
              >
                +/-
              </button>
            </div>

            <div className="flex flex-row-reverse flex-wrap gap-4 ">
              {reverseNumericValues.map(number => {
                return (
                  <button
                    className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-zinc-100 hover:opacity-70"
                    key={number}
                    onClick={() => dispatch({ type: "number", payload: number })}
                  >
                    {number}
                  </button>
                  // }
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            {Object.values(EOperators).map((operator: EOperators) => {
              return (
                <button
                  className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                  key={operator}
                  onClick={() => {
                    dispatch({ type: "operator", payload: operator });
                  }}
                >
                  {operator}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
