// src/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
};

const userSlice = createSlice({
  name: 'user', // Slice name
  initialState, // Initial state
  reducers: { // Reducers
    setUser: (state, action: PayloadAction<UserState>) => { // Reducer setUser function bao gồm state và action
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions; // Export actions

export default userSlice.reducer; // Export reducer