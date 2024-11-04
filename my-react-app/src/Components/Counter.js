import { useEffect, useState } from "react";

function Counter() {
    const [name, setName] = useState("John");
    const [age, setAge] = useState(25);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // 부수 효과
        if(name && age) setIsActive(true);
        else setIsActive(false);
    }, [name, age]);

    useEffect(() => {
        // 마우스 클릭 시 로그 찍기
        function handleMouseClick(event) {
            console.log(event);
        }
        window.addEventListener("mousedown", handleMouseClick);
    })

    return (
        <>
        <h1>
            <span>{name}</span>
            <span>{age}</span>
        </h1>
        <div>
            <input onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
            <input onChange={(e) => setAge(e.target.value)} />
        </div>
        <button disabled={!isActive}>회원가입</button>
        {isActive ? <p>회원 가입 가능</p> : <p>회원 가입 불가능</p>}
        </>
    );
}

export default Counter;