import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataEnabled: false,
};

const switchSlice = createSlice({
  name: "switch",
  initialState,
  reducers: {
    toggle: (state) => {
      state.dataEnabled = !state.dataEnabled ;
    },
  },
});

export default switchSlice.reducer;
export const { toggle } = switchSlice.actions;
