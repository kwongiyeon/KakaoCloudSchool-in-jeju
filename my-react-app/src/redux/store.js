import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducer/counterReducer";

const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export default store;