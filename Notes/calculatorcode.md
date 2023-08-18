import { FC, Reducer, useReducer } from "react";

export interface IProps {}

enum EOperators {
Plus = "+",
Minus = "-"
}

type TState = {
display: string;
operator?: EOperators;
};

type TAction =
| { type: "display_number"; payload: number }
| { type: "operator"; payload: EOperators }
| { type: "clear" };

const initialState: TState = {
display: ""
};

const reducer: Reducer<TState, TAction> = (state, action) => {
switch (action.type) {
case "display_number":
return {
...state,
display: state.display + action.payload
};
case "operator":
state.operator = action.payload;
return {
...state,
operator: action.payload
};
case "clear":
return initialState;
default:
return state;
}
};

<!-- const reducer: Reducer<TState, TAction> = (state, action) => {
switch (action.type) {
case "display_number":
state.display += action.payload;
return state;
case "operator":
if (action.payload === EOperators.Plus) {
}

      state.operator = action.payload;
      return state;
    case "clear":
      state = initialState;
      return state; // better to do return {...initialState}
    default:
      return state;

}
}; -->

const My: FC<IProps> = props => {
const [state, dispatch] = useReducer(reducer, initialState);

return (

<div>
<b>{state.display}</b>

      <button onClick={() => dispatch({ type: "display_number", payload: 1 })}>1</button>
      <button onClick={() => dispatch({ type: "operator", payload: EOperators.Plus })}>{EOperators.Plus}</button>
    </div>

);
};

export default My;
