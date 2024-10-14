// src/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
  customerId: number | null;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
}

const initialState: CustomerState = {
  customerId: null,
  fullName: null,
  email: null,
  phoneNumber: null,
  address: null,
};

const userSlice = createSlice({
  name: 'user', // Slice name
  initialState, // Initial state
  reducers: { // Reducers
    setUser: (state, action: PayloadAction<CustomerState>) => { // Reducer setUser function bao gồm state và action
      state.customerId = action.payload.customerId;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
    },
    clearUser: (state) => {
      state.customerId = null;
      state.fullName = null;
      state.email = null;
      state.phoneNumber = null;
      state.address = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions; // Export actions

export default userSlice.reducer; // Export reducer