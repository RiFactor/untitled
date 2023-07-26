import { useState } from "react";
import "./App.css";

function App() {
  const handleCalculation = (value: number) => {
    console.log(value);
  };

  // state to remember sequence of events and numbers
  const numericValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [result, setResult] = useState("");

  return (
    <div className="test">
      <div>
        <p>Home</p>
        <p>About</p>
        <p> Contact Us</p>
        <div>
          <h1>Calculator</h1>
          <table>
            <tr>Answer: {result}.</tr>
            <tr>
              <th></th>
            </tr>
            <tr>
              <td>
                {numericValues.map(number => {
                  return (
                    // find a way to get it to display a max of 3 per row
                    // do a for loop to find out if it needs to go on a new row
                    <button key={number} onClick={() => handleCalculation(number)}>
                      {number}
                    </button>
                  );
                })}
              </td>
              <button>C</button>
              <button>AC</button>
              <button>+</button>
              <button>-</button>
              <button>/</button>
              <button>*</button>
              <button>=</button>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
