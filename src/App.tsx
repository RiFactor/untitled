import { useState } from "react";
import "./App.css";

function App() {
  const [firstValue, setFirstValue] = useState(Number);
  const [secondValue, setSecondValue] = useState(Number);
  const [operand, setOperand] = useState("");
  const [result, setResult] = useState(Number);

  //combine all these functions to detect the input and then perform actions accordingly
  const handleForLoop = () => {
    for (let i = 0; i < 12; i++) {
      console.log(i);
    }
  };
  const handleCalculation = (value: number) => {
    console.log(value);
    if (!operand) {
      setFirstValue(value);
    }
    setSecondValue(value);
  };

  const handleSum = () => {
    if (!firstValue || !secondValue) return;
    if (operand === "+") {
      setResult(firstValue + secondValue);
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
                <td>Answer: {result && result}</td>
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
                      <button key={number} onClick={() => handleCalculation(number)}>
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
                  <button>AC</button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setOperand("+");
                      console.log(operand);
                    }}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button>-</button>
                </td>
                <td>
                  <button>/</button>
                </td>
                <td>
                  <button>*</button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleSum();
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
