import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 1,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
  },
});

export const { setCounter } = counterSlice.actions;
export default counterSlice.reducer;
