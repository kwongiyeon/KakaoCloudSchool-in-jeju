import { Link } from "react-router-dom"

function Home() {
    return <>
    <p>Home!</p>
    <Link to={"/counter"}>Counter Page</Link>
    </>
}

export default Home;