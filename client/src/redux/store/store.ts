import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import adminReducer from '../slices/adminSlice';
import CartItemCountSlide from '../slices/cartItemsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cartItemCount: CartItemCountSlide,
    admin: adminReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;