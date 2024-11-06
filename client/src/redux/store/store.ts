import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import adminReducer from '../slices/adminSlice';
import CartItemCountSlide from '../slices/cartItemsSlice';
import overlayStatusSlide from '../slices/overlayStatusSilde';

const store = configureStore({
  reducer: {
    user: userReducer,
    cartItemCount: CartItemCountSlide,
    admin: adminReducer,
    overlayStatus: overlayStatusSlide,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;