import { useState } from "react";
import "./App.css";

interface Calculator {
  firstOperand: number;
  secondOperand: number;
  operator: string;
  result: number;
}

function App() {
  const [calculatorState, setCalculatorState] = useState<Calculator>({
    firstOperand: 0, // do I want this to be an array
    secondOperand: 0,
    operator: "",
    result: 0 // is there a neater way to default these to empty?
  });

  //combine all these functions to detect the input and then perform actions accordingly

  const handleCalculator = (value: number | string) => {
    console.log("calculator");
    if (typeof value === "number") {
      if (calculatorState.operator) {
        setCalculatorState({ ...calculatorState, secondOperand: value });
        return; // do I need this here
      }
      setCalculatorState({ ...calculatorState, firstOperand: value });
    }
    if (value === "=") {
      const sum =
        calculatorState.operator === "+"
          ? calculatorState.firstOperand + calculatorState.secondOperand
          : calculatorState.operator === "-"
          ? calculatorState.firstOperand - calculatorState.secondOperand
          : calculatorState.operator === "*"
          ? calculatorState.firstOperand * calculatorState.secondOperand
          : calculatorState.firstOperand / calculatorState.secondOperand;

      setCalculatorState({
        ...calculatorState,
        result: sum,
        firstOperand: sum,
        secondOperand: 0, // reset to enable furuther operations
        operator: ""
      });
    }
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

          <table>
            <thead>
              <tr>
                <td>
                  Answer:{" "}
                  {calculatorState.result
                    ? calculatorState.result
                    : calculatorState.secondOperand
                    ? calculatorState.secondOperand
                    : calculatorState.firstOperand}
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
                  <button>C</button>
                </td>
                <td>
                  {/* clear all */}
                  <button
                    onClick={() => {
                      setCalculatorState({ firstOperand: 0, secondOperand: 0, operator: "", result: 0 });
                    }}
                  >
                    AC
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setCalculatorState({ ...calculatorState, operator: "+" });
                      console.log(calculatorState.operator);
                    }}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setCalculatorState({ ...calculatorState, operator: "-" });
                      console.log(calculatorState.operator);
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setCalculatorState({ ...calculatorState, operator: "/" });
                      console.log(calculatorState.operator);
                    }}
                  >
                    /
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setCalculatorState({ ...calculatorState, operator: "*" });
                      console.log(calculatorState.operator);
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
