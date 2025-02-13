import { UserData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: [] as UserData[],
  isLoading: false,
  isEdit: null as null | UserData,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<UserData[]>) => {
      state.data = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsEdit: (state, action: PayloadAction<UserData | null>) => {
      state.isEdit = action.payload;
    },
  },
});

export const { setData, setIsLoading, setIsEdit } = usersSlice.actions;
export default usersSlice.reducer;
