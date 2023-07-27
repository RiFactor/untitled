import { useState } from "react";
import "./App.css";

interface Calculator {
  firstOperandOrResult: number;
  secondOperand: number;
  operator: string;
  lastUpdated: string;
  // result: number;
}

function App() {
  const [calculatorState, setCalculatorState] = useState<Calculator>({
    // firstOperandOrResult: 0, // do I want this to be an array
    // secondOperand: 0,
    // operator: "",
    // lastUpdated: ""
    // result: 0 // is there a neater way to default these to empty?
  } as Calculator);

  //combine all these functions to detect the input and then perform actions accordingly

  const handleCalculator = (value: number | string) => {
    // if passing a number, update the operand
    if (typeof value === "number") {
      if (calculatorState.firstOperandOrResult) {
        setCalculatorState({ ...calculatorState, secondOperand: value, lastUpdated: "secondOperand" });
        console.log(calculatorState);

        return;
      }
      setCalculatorState({ ...calculatorState, firstOperandOrResult: value, lastUpdated: "firstOperandOrResult" });
      console.log(calculatorState);

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
          : // bug here!
            calculatorState.firstOperandOrResult / calculatorState.secondOperand;

      setCalculatorState({
        ...calculatorState,
        // result: sum, // is this needed?
        firstOperandOrResult: sum,
        secondOperand: 0,
        // , // reset to enable furuther operations
        operator: value
      });
      console.log(calculatorState);

      return;
    }

    // otherwise just udpate the operator
    setCalculatorState({ ...calculatorState, operator: value, lastUpdated: "operator" }); // bug created for "="

    console.log(calculatorState);
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
                    // calculatorState.result
                    //   ? calculatorState.result
                    //   :
                    calculatorState.lastUpdated === "clear"
                      ? 0
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
                  {/* clear [one digit?] */}
                  <button
                    onClick={() => {
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
                      // const clear =
                      //   calculatorState.lastUpdated === "firstOperand"
                      //     ? "firstOperand"
                      //     : calculatorState.lastUpdated === "secondOperandOrResult"
                      //     ? "secondOperandOrResult"
                      //     : "Operator";
                      // setCalculatorState({ ...calculatorState });
                    }}
                  >
                    C
                  </button>
                </td>
                <td>
                  {/* clear all */}
                  <button
                    onClick={() => {
                      setCalculatorState({
                        // firstOperandOrResult: 0,
                        // secondOperand: 0,
                        // operator: "",
                        // lastUpdated: ""
                        // , result: 0
                      } as Calculator);
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
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
