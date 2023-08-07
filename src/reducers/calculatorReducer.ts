import { Reducer } from "react";

export enum EOperators {
  "divide" = "/", // Question -- good for aria labels??
  "multiply" = "*",
  "subtract" = "-",
  "add" = "+",
  "equals" = "="
}

type TState = {
  // TODO: display: string; // optional? - to display arrow of prev functions
  firstOperandOrResult?: number;
  secondOperand?: number;
  operator?: EOperators;
  lastUpdated?: "firstOperandOrResult" | "secondOperand" | "operator" | "sum";
  error?: boolean;
};

// TODO:  {type: "display_number"; payload: number}
type TAction =
  | { type: "number"; payload: number }
  | { type: "operator"; payload: EOperators }
  | { type: "sign_inversion" }
  | { type: "clear_last_value" }
  | { type: "clear_all" }; // why snake_case

const initialState: TState = {
  // display: "" // TODO
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
  let copyState = { ...state };
  console.log("state:", copyState);
  switch (action.type) {
    case "number": {
      if (!copyState.secondOperand && copyState.lastUpdated === "sum") {
        // NOTE: enable user to start new arithmetic operation, same behaviour as computer / phone:  essentially clear operations when typing new number when first result saved [done?]
        copyState = { ...initialState }; // not doing shallow copy was causing an error
      }
      copyState.error = false; // ?? after
      if (copyState.operator) {
        if (!copyState.secondOperand && copyState.secondOperand !== 0) {
          copyState.secondOperand = action.payload; // Question -- manipulating state here
        } else if (copyState.secondOperand.toString().length < 8) {
          const singleValue = parseInt([state.secondOperand, action.payload].join(""));
          copyState.secondOperand = singleValue;
        }
        return { ...copyState, lastUpdated: "secondOperand" }; // Question -- only updating one bit here ?? i think: needed b/c o/w it will try to update the firstOperand
      } else if (!copyState.firstOperandOrResult && copyState.firstOperandOrResult !== 0) {
        copyState.firstOperandOrResult = action.payload;
        // copyState.lastUpdated = "firstOperandOrResult";
      } else if (copyState.firstOperandOrResult.toString().length < 8) {
        const singleValue = parseInt([copyState.firstOperandOrResult, action.payload].join(""));
        copyState.firstOperandOrResult = singleValue;
        // copyState.lastUpdated = "firstOperandOrResult";
      }
      // return { ...state }; // default here?
      return { ...copyState, lastUpdated: "firstOperandOrResult" };
      // return { ...state, firstOperandOrResult: newFirstOperandOrResult, lastUpdated: "firstOperandOrResult" };
    }
    case "operator":
      // see if calculation possible, o/w just store operator
      if (!copyState.firstOperandOrResult && copyState.firstOperandOrResult !== 0) {
        return { ...initialState };
      } // don't just apply changes to second value if there isn't a first value
      else if (
        copyState.operator &&
        (copyState.secondOperand || copyState.secondOperand === 0) &&
        (copyState.firstOperandOrResult || copyState.firstOperandOrResult === 0)
      ) {
        // checking if first too jic some weird error occurs
        // TODO: if-else then see if can be switch-case  -- nested switch-case or pass in payload here?
        let sum =
          copyState.operator === EOperators.divide
            ? copyState.firstOperandOrResult / copyState.secondOperand
            : copyState.operator === EOperators.multiply
            ? copyState.firstOperandOrResult * copyState.secondOperand
            : copyState.operator === EOperators.subtract
            ? copyState.firstOperandOrResult - copyState.secondOperand
            : copyState.operator === EOperators.add
            ? copyState.firstOperandOrResult + copyState.secondOperand
            : 0; // shouldn't get here // expect default to be sum?

        if (sum.toString().length > 8) {
          // better to use 'let' sum or rename value?
          sum = tryRoundingDecimalPlaces(sum);
        }

        if (sum.toString().length > 8) {
          copyState = { ...initialState };
          return { ...copyState, error: true }; // Question -- return copy state??
        } else {
          const sumOrOtherOperand = action.payload === EOperators.equals ? "sum" : "operator";
          return {
            // TO DO -- only if the last operation was an equals sign
            ...copyState, // Question -- return copy state?
            firstOperandOrResult: sum,
            secondOperand: undefined,
            operator: action.payload,
            lastUpdated: sumOrOtherOperand
          };
        }
      } else return { ...copyState, operator: action.payload, lastUpdated: "operator" }; // is last updated needed - yes b/c o/w will wipe out number!

    case "sign_inversion":
      if (copyState.secondOperand) {
        return { ...copyState, secondOperand: copyState.secondOperand * -1 };
        // copyState.secondOperand *= -1;
        // copyState.secondOperand = copyState.secondOperand * -1; // Question -- help!?
      }
      if (copyState.firstOperandOrResult) {
        return { ...copyState, firstOperandOrResult: copyState.firstOperandOrResult * -1 }; // Question ??
      }
      return { ...copyState }; // Question -- does this need to be spread

    case "clear_last_value":
      if (state.lastUpdated === "firstOperandOrResult") {
        console.log("clear the first value");
        return { ...copyState, firstOperandOrResult: undefined, lastUpdated: undefined };
      } else if (state.lastUpdated === "secondOperand") {
        copyState.secondOperand = 0;
        copyState.lastUpdated = "operator"; // Question -- how to not duplicate this
        console.log("clear the second operand");
        // return { ...state, secondOperand: undefined, lastUpdated: undefined };
      } else if (state.lastUpdated === "operator") {
        console.log("clear the operator, not really needed tbh");
        // return { ...state, operator: undefined, lastUpdated: undefined };
        copyState.operator = undefined;
        copyState.lastUpdated = "firstOperandOrResult"; // Question -- how to not duplicate this
      }
      console.log("clearing the last value", { ...copyState });
      return { ...copyState };

    case "clear_all":
      console.log("trying to clear");
      return { ...initialState }; // do I need to set the state as initial state?

    default: // IF NUMBER BUT MORE THAN 7 CHARACTERS, should be covered above
      console.log("how did you get here", copyState);
      return { ...copyState }; // Question -- return the copy still?
  }
};

export default calculatorReducer;
