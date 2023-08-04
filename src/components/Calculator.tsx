import { useEffect, useReducer } from "react";
import calculatorReducer, { EOperators } from "reducers/calculatorReducer";
// LOGIC to cover: essentially clear operations when typing new number when first result saved [done?]

// window.addEventListener("keydown"); // Answered -- want to get key event listeners (using window b/c nt specific text field) // ensure event listener stops when on diff route useeffect w/ cleanup
// DONE stop listening to keyboard when navigation away -> clean up
// DONE only read values once; THIS WILL resolve the ERR not displaying when using keyboard

// window.addEventListener;("keypress", )

const Calculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, {});
  const numericValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // leave these as they are, not enum
  const reverseNumericValues = numericValues.reverse();

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          dispatch({ type: "number", payload: parseInt(event.key) });
          return;
        case "=":
        case "/":
        case "-": // ToDo logic to save second operand and chain consecutive operations e.g. 5+4 = 20 -> = 24 = 28 etcs
        case event.shiftKey && "*":
        case event.shiftKey && "+":
          // Question how do I handle shift key and *
          dispatch({ type: "operator", payload: event.key as EOperators });
          return;
        case event.shiftKey && "_": // allow user to minus using shift key
          dispatch({ type: "operator", payload: "-" as EOperators });
          return;
        case "Enter":
          dispatch({ type: "operator", payload: "=" as EOperators });
          return;
        case "c":
        case "C":
        case "Delete": // Question -- help // ToDo add complex logic to remove last item of operand
          dispatch({ type: "clear_last_value" });
          return;
        case "a":
        case "A":
          dispatch({ type: "clear_all" });
          return;
        case "`": // or alternate agreed key
          dispatch({ type: "sign_inversion" });
          return;
        default:
          break; // Question -- do I want this to be return?
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [state]);

  const display = () => {
    //TODO if-else
    return state.error
      ? "ERR"
      : state.secondOperand || state.secondOperand === 0
      ? state.secondOperand
      : state.firstOperandOrResult || state.firstOperandOrResult === 0
      ? state.firstOperandOrResult
      : 0;

    // Answered, can't make this a switch-case
  };

  // const arrayOfOperators = Object.keys(EOperators) as EOperators[]; // alternate TS solution

  return (
    <main className="gap-4">
      <h1 className="pl-4">Calculator</h1>
      <div className="m-4 flex max-w-[16.25rem] flex-col gap-2 rounded border-2 p-4 dark:border-neutral-400">
        <h2 className="mb-3 rounded border-2 border-neutral-400 p-3.5 text-right text-4xl font-bold leading-8 tracking-tight">
          {display()}
        </h2>
        <div className="flex flex-row gap-4">
          {/* Answered - guess or try grid: how do i make the spacing here consistent, tried grow */}
          <div className=" flex w-3/4 flex-col gap-4">
            <div className="flex justify-between">
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

            <div className="flex flex-row-reverse flex-wrap justify-between gap-4 ">
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
          <div className="flex w-1/4 flex-col gap-4 ">
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
