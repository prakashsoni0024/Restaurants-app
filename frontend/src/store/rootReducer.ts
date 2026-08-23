import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "@/features/home/state/counterSlice"


const rootReducer = combineReducers({
    counter: counterReducer,
});

export default rootReducer;