import { useRef } from "react"

function RefTest() {
    const pRef = useRef();

    useEffect(function isActive() {
        // const p = document.querySelector("#hello");
        // console.log(p);

        const p = pRef.current;
        console.log(p);

        p.innerText = "안녕히가세요";
    }, []);
}

return (
<>
        {/* <p id="hello">안녕하세요</p> */}
        <p ref={pRef}>안녕하세요</p>
</>
)

export default RefTest;