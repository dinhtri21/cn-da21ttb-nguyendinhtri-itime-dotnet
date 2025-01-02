import { Admin } from "@/types/admin";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AdminState {
  admin: Admin | null;
}

const initialState: AdminState = {
  admin: null,
};

const adminSlide = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
    },
  },
});

export const { setAdmin } = adminSlide.actions;
export default adminSlide.reducer;