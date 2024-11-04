import { useEffect, useState } from "react";

function Counter() {
    const [name, setName] = useState("John");
    const [age, setAge] = useState(25);
    const [isActive, setIsActive] = useState(false);

    useEffect(function isActive() {
        if(name && age) setIsActive(true);
        else setIsActive(false);
    }, [name, age]);

    return (
        <>
        <h2>
            <span>{name}</span>
            <span>{age}</span>
        </h2>
        <div>
            <input onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
            <input onChange={(e) => setAge(e.target.value)} />
        </div>
        <button disabled={!isActive}>회원가입</button>
        </>
    );
}

export default Counter;