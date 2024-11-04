import { Link } from "react-router-dom"
import Counter from "../Components/Counter";

function CounterPage() {
    return <div>
        <Counter />
        <Link to="/">Home</Link>    
    </div>
}

export default CounterPage;