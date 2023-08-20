import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from './sliderSlice'
import switchSlice from "./switchSlice";


const store = configureStore( {
    reducer : {
        slider: sliderReducer, 
        switch : switchSlice
    }
})

export default store