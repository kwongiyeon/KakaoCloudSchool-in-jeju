// 3가지 만들어야 함    1. 초기화 2. 초기 값 3. 행동

// 초기화
export function init(count) {
    return count;
}

// 초기 값
export const initialState = 1;

// 행동
export function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1 * 10;
        case "DECREMENT":
            return state - 1 * 10;
        case "RESET":
            return init(action.payload || initialState);
        default:
            return state;
    }
}