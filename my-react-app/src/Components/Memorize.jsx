export function Memorize(props) {
    return (
        <>
            <h1>{props.count}</h1>
            <button onClick={props.setCount}>+</button>
        </>
    )
}