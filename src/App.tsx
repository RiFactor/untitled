import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

// ToDo extract reusable functions
// UI
// EdgeCase: enter number, then operator and clear operator w/o selecting a new operator: enter number should clear prev number
// EdgeCase: above - iPhone will just remember the operator if a new one isn't provided
// OR just overwrite operator, don't need clear function for it! :)

interface Calculator {
  firstOperandOrResult: number; // do I want this to be an array
  secondOperand: number;
  operator: string;
  lastUpdated: string;
  // result: number;
}

// state to remember sequence of events and numbers
const numericValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const reverseNumericValues = numericValues.reverse();
const bonusOperators = ["C", "AC", "+/-"];
const operators = ["/", "*", "-", "+", "="];

function App() {
  const [calculatorState, setCalculatorState] = useState<Calculator>({} as Calculator); // is this ok and better than setting default 0 / "" values
  const [error, setError] = useState(Boolean);

  //combine all these functions to detect the input and then perform actions accordingly

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
      console.log("length of sum", sum.toString().length);
      if (sum.toString().length > 8) {
        setCalculatorState({} as Calculator);
        setError(true);
        return; // or should the state be wiped completely
      }

      setCalculatorState({
        ...calculatorState,
        // result: sum, // is this needed?
        firstOperandOrResult: sum,
        secondOperand: 0,
        // , // reset to enable furuther operations
        // operator: value === "=" ? "" : value
        operator: value
      });
      console.log(calculatorState);

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

  const handleForLoop = () => {
    for (let i = 0; i < 12; i++) {
      console.log(i);
    }
  };

  return (
    <div>
      <div>
        <nav>
          {/* links will be better */}
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/"> Contact Us</a>
        </nav>
        <div>
          <h1>Calculator</h1>
          <Card title="heading" description="text here" />
          <button onClick={() => handleForLoop()}>Click Me</button>

          <div className="calculator md p-4 md:w-1/2" style={{ maxWidth: "720px" }}>
            <div
              className={` overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
            >
              <div className="p-6">
                <h2 className="mb-3 rounded-md border p-3.5 text-right text-5xl font-bold leading-8 tracking-tight">
                  {
                    // calculatorState.lastUpdated === "clear"
                    //   ? 0
                    //   :
                    error
                      ? "ERR"
                      : calculatorState.secondOperand
                      ? calculatorState.secondOperand
                      : calculatorState.firstOperandOrResult
                      ? calculatorState.firstOperandOrResult
                      : 0
                  }
                </h2>
                <div className="keypad text-white-700 flex flex-row font-bold">
                  {/* want flex flex-row-reverse? */}

                  <div className="numbers-and-operators flex flex-col gap-2">
                    <div className="bonus-operators flex gap-2">
                      <button
                        className="keypad text-white-700 w-16 p-2 font-bold"
                        onClick={() => {
                          // ToDo refactor?
                          if (calculatorState.lastUpdated === "operator") {
                            setCalculatorState({ ...calculatorState, operator: "", lastUpdated: "clear" });
                          }
                          if (calculatorState.lastUpdated === "secondOperand") {
                            setCalculatorState({ ...calculatorState, secondOperand: 0, lastUpdated: "clear" });
                          }
                          if (calculatorState.lastUpdated === "firstOperandOrResult") {
                            setCalculatorState({ ...calculatorState, firstOperandOrResult: 0, lastUpdated: "clear" });
                          }
                          console.log(calculatorState);
                        }}
                      >
                        C
                      </button>
                      <button
                        className="keypad text-white-700 w-16 p-2 font-bold"
                        onClick={() => {
                          setCalculatorState({} as Calculator);
                          setError(false); // same here
                        }}
                      >
                        AC
                      </button>
                      <button
                        className="keypad text-white-700 w-16 p-2 font-bold"
                        onClick={() => {
                          handleCalculator("+/-");
                          console.log(calculatorState.operator);
                        }}
                      >
                        +/-
                      </button>
                    </div>

                    {/* why isn't this style working */}
                    <div className="gap-2">
                      {reverseNumericValues.reverse().map(number => {
                        return (
                          // find a way to get it to display a max of 3 per row
                          // do a for loop to find out if it needs to go on a new row
                          // for (i = 0; i < 12; i ++) {
                          <button
                            className="keypad text-white-700 w-16 gap-20 p-2 font-bold"
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
                  <div className="keypad text-white-700 w-16 p-2 font-bold">
                    {operators.map((operator, index) => {
                      // question -- should you use index?
                      return (
                        <button
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
