import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: null,
};

const svgSlice = createSlice({
  name: "svg",
  initialState,
  reducers: {
    setWidth: (state,action) => {
      state.width = action.payload;
    },
  },
});

export default svgSlice.reducer;
export const { setWidth } = svgSlice.actions;
