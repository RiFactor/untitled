import { useEffect, useReducer, useRef, MouseEventHandler } from "react";
import calculatorReducer, { EOperators } from "reducers/calculatorReducer";

const Calculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, {});
  const numericValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // Question - explain why : leave these as they are, not enum
  const reverseNumericValues = numericValues.reverse();
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleButtonClick: (fn: () => void) => MouseEventHandler<HTMLButtonElement> = fn => event => {
    if (event.nativeEvent instanceof PointerEvent && !event.nativeEvent.pointerType) return;

    fn();
  };

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      console.log(event.key);
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
          break;
        case EOperators.divide:
        case EOperators.add:
        // case EOperators.equals: // trying to remove bug
        case EOperators.multiply:
        case EOperators.subtract: // ToDo logic to save second operand and chain consecutive operations e.g. 5+4 = 20 -> = 24 = 28 etcs
          dispatch({ type: "operator", payload: event.key as EOperators });
          break;
        case "_": // Note: allow user to subtract using shift key
          dispatch({ type: "operator", payload: EOperators.subtract });
          break;
        case "Enter":
          // event.preventDefault();
          // buttons.current["="]?.focus();
          dispatch({ type: "operator", payload: EOperators.equals });
          break;
        case "c":
        case "C":
        case "Backspace": // ToDo add complex logic to remove last item of operand; or first operandOrResult
          dispatch({ type: "clear_last_value" });
          break;
        case "a":
        case "A":
          dispatch({ type: "clear_all" });
          break;
        case "`": // Question -- suggest alternate agreed key
          dispatch({ type: "sign_inversion" });
          break;
        default:
          break; // Question -- do I want this to be return?
      }
      buttons.current[event.key]?.focus();
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [state]);

  const display = () => {
    // Answered can't make this a switch-case
    if (state.error) {
      return "ERR";
    } else if (state.secondOperand || state.secondOperand === 0) {
      return state.secondOperand;
    } else if (state.firstOperandOrResult || state.firstOperandOrResult === 0) {
      return state.firstOperandOrResult;
    } else {
      return 0;
    }
  };

  // const arrayOfOperators = Object.keys(EOperators) as EOperators[]; // NOTE: alternate TS solution

  return (
    <main className="gap-4">
      <h1 className="pl-4">Calculator</h1>
      <div className="m-4 flex max-w-[16.25rem] flex-col gap-2 rounded border-2 p-4 dark:border-neutral-400">
        <h2 className="mb-3 rounded border-2 border-neutral-400 p-3.5 text-right text-4xl font-bold leading-8 tracking-tight">
          {display()}
        </h2>
        <div className="flex flex-row gap-4">
          {/* TODO - guess values or try grid */}
          <div className=" flex w-3/4 flex-col gap-4">
            <div className="flex justify-between">
              <button
                ref={node => {
                  buttons.current["a"] = node;
                  buttons.current["A"] = node; // QUESTION -- can you do this?
                }}
                className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                onClick={handleButtonClick(() => {
                  dispatch({ type: "clear_all" });
                })}
              >
                AC
              </button>
              <button
                ref={node => {
                  buttons.current["c"] = node;
                  buttons.current["C"] = node;
                }}
                className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                // onClick={event => {
                //   if (event.nativeEvent instanceof PointerEvent && !event.nativeEvent.pointerType) return;

                //   dispatch({ type: "clear_last_value" });
                // }}
                onClick={handleButtonClick(() => {
                  dispatch({ type: "clear_last_value" });
                })}
              >
                C
              </button>
              <button
                ref={node => {
                  buttons.current["sign"] = node;
                }}
                className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                // onClick={event => {
                //   if (event.nativeEvent instanceof PointerEvent && !event.nativeEvent.pointerType) return;

                //   dispatch({ type: "sign_inversion" });
                // }}
                onClick={handleButtonClick(() => {
                  dispatch({ type: "sign_inversion" });
                })}
              >
                +/-
              </button>
            </div>

            <div className="flex flex-row-reverse flex-wrap justify-between gap-4 ">
              {reverseNumericValues.map(number => {
                return (
                  <button
                    ref={node => {
                      buttons.current[number] = node;
                    }}
                    className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-zinc-100 hover:opacity-70"
                    key={number}
                    // onClick={() => dispatch({ type: "number", payload: number })}
                    onClick={handleButtonClick(() => {
                      dispatch({ type: "number", payload: number });
                    })}
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
                  ref={node => {
                    buttons.current[operator] = node;
                  }}
                  className="h-10 w-10 rounded-md bg-gray-900 p-2 font-bold text-amber-600 hover:opacity-70"
                  key={operator}
                  // onClick={() => {
                  //   dispatch({ type: "operator", payload: operator });
                  // }}
                  onClick={handleButtonClick(() => {
                    dispatch({ type: "operator", payload: operator });
                  })}
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
