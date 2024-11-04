import { useDispatch, useSelector } from "react-redux";
import {
  addNumber,
  decreased,
  increased,
} from "./redux/reducer/counterReducer";

function App() {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>{count.value}</h1>
      <button onClick={() => dispatch(increased())}>+</button>
      <button onClick={() => dispatch(decreased())}>-</button>
      <button onClick={() => dispatch(addNumber(5))}>+5</button>
    </div>
  );
}

export default App;