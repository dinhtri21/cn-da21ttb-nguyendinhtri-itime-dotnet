import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import CartItemCountSlide from '../slices/cartItemsSlide';

const store = configureStore({
  reducer: {
    user: userReducer,
    cartItemCount: CartItemCountSlide,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;