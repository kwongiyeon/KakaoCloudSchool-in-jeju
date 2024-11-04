// 3가지 만들어야 함    1. 초기화 2. 초기 값 3. 행동
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice( {
    name: "counter", 
    initialState: {
    value: 0,
    },
    reducers: {
        increased: (state) => {
            state.value += 1;
        },
        decreased: (state) => {
            state.value -= 1;
        },
        addNumber: (state,action) => {
            state.value = state.value + action.payload;
        },
    },
});

export const { increased, decreased, addNumber } = counterSlice.actions;
export default counterSlice.reducer;