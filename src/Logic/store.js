import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from './sliderSlice'
import switchSlice from "./switchSlice";
import svgSlice from "./svgSlice";


const store = configureStore( {
    reducer : {
        slider: sliderReducer, 
        switch: switchSlice,
        svg : svgSlice
    }
})

export default store