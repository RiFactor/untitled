import { useState } from "react";
import "./App.css";

// ToDo extract reusable functions
// UI

interface Calculator {
  firstOperandOrResult: number; // do I want this to be an array
  secondOperand: number;
  operator: string;
  lastUpdated: string;
  // result: number;
}

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

  // state to remember sequence of events and numbers
  const numericValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
          <button onClick={() => handleForLoop()}>Click Me</button>

          <table
          // className="max-w-[9.4rem]"
          >
            <thead>
              <tr>
                <td>
                  Answer:{" "}
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
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th></th>
              </tr>
              <tr>
                <td>
                  {numericValues.map(number => {
                    return (
                      // find a way to get it to display a max of 3 per row
                      // do a for loop to find out if it needs to go on a new row
                      // for (i = 0; i < 12; i ++) {
                      <button key={number} onClick={() => handleCalculator(number)}>
                        {number}
                      </button>
                      // }
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td>
                  <button
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
                </td>
                <td>
                  <button
                    onClick={() => {
                      setCalculatorState({} as Calculator); // same here
                    }}
                  >
                    AC
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleCalculator("+");
                    }}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleCalculator("-");
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleCalculator("/");
                    }}
                  >
                    /
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleCalculator("*");
                    }}
                  >
                    *
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleCalculator("=");
                      console.log(calculatorState.operator);
                    }}
                  >
                    =
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleCalculator("+/-");
                      console.log(calculatorState.operator);
                    }}
                  >
                    +/-
                  </button>
                </td>
                <td>
                  {/* ToDo Bonus Feature */}
                  {/* <button
                    onClick={() => {
                      handleCalculator(".");
                      console.log(calculatorState.operator);
                    }}
                  >
                    .
                  </button> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
