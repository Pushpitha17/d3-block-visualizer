import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sliderValue: 10,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    slide: (state, action) => {
      state.sliderValue = action.payload;
    },
  },
});

export default sliderSlice.reducer;
export const { slide } = sliderSlice.actions;
