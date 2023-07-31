import { useState } from "react";

interface ICalculator {
  firstOperandOrResult: number; // do I want this to be an array
  secondOperand: number;
  operator: string;
  lastUpdated: string;
}
// state to remember sequence of events and numbers
const numericValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const reverseNumericValues = numericValues.reverse();
// const bonusOperators = ["C", "AC", "+/-"];
const operators = ["/", "*", "-", "+", "="];

const Calculator = () => {
  const [calculatorState, setCalculatorState] = useState<ICalculator>({} as ICalculator); // is this ok and better than setting default 0 / "" values
  const [error, setError] = useState(Boolean);

  const handleClear = () => {
    // ToDo refactor? switch-case or is there a way to dynamically pass the var to update
    if (calculatorState.lastUpdated === "operator") {
      setCalculatorState({ ...calculatorState, operator: "", lastUpdated: "clear" });
    }
    if (calculatorState.lastUpdated === "secondOperand") {
      setCalculatorState({ ...calculatorState, secondOperand: 0, lastUpdated: "clear" });
    }
    if (calculatorState.lastUpdated === "firstOperandOrResult") {
      setCalculatorState({ ...calculatorState, firstOperandOrResult: 0, lastUpdated: "clear" });
    }
  };

  const handleCalculator = (value: number | string) => {
    if (error) setError(false);
    // if passing a number, update the operand
    if (typeof value === "number") {
      if (calculatorState.operator) {
        if (!calculatorState.secondOperand) {
          setCalculatorState({ ...calculatorState, secondOperand: value, lastUpdated: "secondOperand" });
          return; // is there a better way to not write return constantly
        }
        // this can become a reusable function
        if (calculatorState.secondOperand.toString().length > 7) return;
        const singleValue = parseInt([calculatorState.secondOperand, value].join(""));
        setCalculatorState({ ...calculatorState, secondOperand: singleValue, lastUpdated: "secondOperand" });
        return;
      }
      if (!calculatorState.firstOperandOrResult) {
        setCalculatorState({ ...calculatorState, firstOperandOrResult: value, lastUpdated: "firstOperandOrResult" });
        return;
      }
      if (calculatorState.firstOperandOrResult.toString().length > 7) return;
      const singleValue = parseInt([calculatorState.firstOperandOrResult, value].join(""));
      setCalculatorState({
        ...calculatorState,
        firstOperandOrResult: singleValue,
        lastUpdated: "firstOperandOrResult"
      });
      return;
    }

    // if not passing a number but passing an operator, check to see if a calculation can be made between 2 numbers
    if (calculatorState.secondOperand) {
      const sum =
        // switch-case; if-else statements are better
        calculatorState.operator === "+"
          ? calculatorState.firstOperandOrResult + calculatorState.secondOperand
          : calculatorState.operator === "-"
          ? calculatorState.firstOperandOrResult - calculatorState.secondOperand
          : calculatorState.operator === "*"
          ? calculatorState.firstOperandOrResult * calculatorState.secondOperand
          : calculatorState.firstOperandOrResult / calculatorState.secondOperand;
      if (sum.toString().length > 8) {
        setCalculatorState({} as ICalculator);
        setError(true);
        return; // or should the state be wiped completely
      }

      setCalculatorState({
        ...calculatorState,
        firstOperandOrResult: sum,
        secondOperand: 0,
        // , // reset to enable furuther operations
        // operator: value === "=" ? "" : value
        operator: value
      });
      return;
    }

    // otherwise just udpate the operator
    if (value === "+/-") {
      if (calculatorState.secondOperand) {
        setCalculatorState({ ...calculatorState, secondOperand: calculatorState.secondOperand * -1 });
        return;
      }
      setCalculatorState({ ...calculatorState, firstOperandOrResult: calculatorState.firstOperandOrResult * -1 });
      return;
    }
    setCalculatorState({ ...calculatorState, operator: value, lastUpdated: "operator" });
    return;
  };

  return (
    <>
      <div className="m-4 flex max-w-[250px] flex-col gap-2 rounded border p-4 dark:border-neutral-700">
        <h2 className="mb-3 rounded border p-3.5 text-right text-4xl font-bold leading-8 tracking-tight">
          {
            // switch-case
            error
              ? "ERR"
              : calculatorState.secondOperand
              ? calculatorState.secondOperand
              : calculatorState.firstOperandOrResult
              ? calculatorState.firstOperandOrResult
              : 0
          }
        </h2>
        <div className="flex flex-row gap-4">
          <div className="numbers-and-operators flex flex-col gap-4">
            {/* pl-2 is a hack */}
            <div className="flex gap-4 pl-2">
              <button
                className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                onClick={() => handleClear()}
              >
                C
              </button>
              <button
                className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                onClick={() => {
                  setCalculatorState({} as ICalculator);
                  setError(false); // same here
                }}
              >
                AC
              </button>
              <button
                className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                onClick={() => {
                  handleCalculator("+/-");
                }}
              >
                +/-
              </button>
            </div>

            <div className="flex flex-row-reverse flex-wrap gap-4 ">
              {numericValues.map(number => {
                return (
                  <button
                    className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-zinc-100 hover:opacity-70"
                    key={number}
                    onClick={() => handleCalculator(number)}
                  >
                    {number}
                  </button>
                  // }
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            {operators.map((operator, index) => {
              // Question -- should you use index?
              return (
                <button
                  className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                  key={index}
                  onClick={() => {
                    handleCalculator(operator);
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
