import { useEffect, useReducer } from "react";
import calculatorReducer, { EOperators } from "reducers/calculatorReducer";
// LOGIC to cover: essentially clear operations when typing new number when first result saved

// window.addEventListener("keydown"); // Answered -- want to get key event listeners (using window b/c nt specific text field) // ensure event listener stops when on diff route useeffect w/ cleanup
// TODO stop listening to keyboard when navigation away -> clean up
// TODO only read values once

// window.addEventListener;("keypress", )

const Calculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, {});
  const numericValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // leave these as they are, not enum
  const reverseNumericValues = numericValues.reverse();
  useEffect(() => {
    console.log("load");
    window.addEventListener("keydown", event => {
      console.log(event.key);
      // switch (event.key) {
      //   case event.key:
      //     dispatch({ type: "number", payload: parseInt(event.key) }); // want it to happen once
      // }
      // switch case here how??
      console.log(parseInt(event.key));
      if (parseInt(event.key) || event.key === "0") {
        dispatch({ type: "number", payload: parseInt(event.key) });
      } else if (
        (event.shiftKey && event.key === "*") ||
        (event.shiftKey && event.key === "+") ||
        event.key === "/" ||
        event.key === "=" ||
        event.key === "-"
      ) {
        console.log(event.key, "test operator");
        dispatch({ type: "operator", payload: event.key as EOperators }); // want it to happen once
      } else if (event.key === "Enter") {
        dispatch({ type: "operator", payload: "=" as EOperators });
      }
      // add signal to abort (cleanup when leaving page)
      else if (event.key === "c" || event.key === "C") {
        console.log(event.key, "clear last value");
        dispatch({ type: "clear_last_value" });
      } else if (event.key === "a" || event.key === "A") {
        console.log(event.key, "clear all");
        dispatch({ type: "clear_all" });
      } else if (event.key === "`") {
        console.log(event.key, "sign inversion");
        dispatch({ type: "sign_inversion" });
      } else if (parseInt(event.key) || event.key === "0") {
        dispatch({ type: "number", payload: parseInt(event.key) }); // want it to happen once
      } else {
        console.log(event.key, "else");
        return; // do nothing, not clear!! --> is it b/c page is being reloaded?
      }
    });
  }, []);

  const display = () => {
    return state.error
      ? "ERR"
      : state.secondOperand || state.secondOperand === 0
      ? state.secondOperand
      : state.firstOperandOrResult || state.firstOperandOrResult === 0
      ? state.firstOperandOrResult
      : 0;

    // how do I make this a switch-case
    // switch (state) {
    //   case state.error:
    //     return "ERR";
    //   case state.secondOperand:
    //     return state.secondOperand;
    //   case state.firstOperandOrResult:
    //     return state.firstOperandOrResult
    //   default
    //     return 0;
    //   }
  };

  // const arrayOfOperators = Object.keys(EOperators) as EOperators[]; // alternate TS solution

  return (
    <main className="gap-4">
      <h1 className="">Calculator</h1>
      <div className="m-4 flex max-w-[260px] flex-col gap-2 rounded border-2 p-4 dark:border-neutral-400">
        <h2 className="mb-3 rounded border-2 border-neutral-400 p-3.5 text-right text-4xl font-bold leading-8 tracking-tight">
          {display()}
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
    </main>
  );
};

export default Calculator;
