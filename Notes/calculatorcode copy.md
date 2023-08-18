import { FC, Reducer, useReducer } from "react";

export interface IProps {}

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
