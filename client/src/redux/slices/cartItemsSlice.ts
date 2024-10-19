import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

interface CartItemCount {
    total: number;
}

const initialState: CartItemCount = {
    total: 0,
};

const CartItemCountSlide = createSlice({
    name: "cartItems",
    initialState,
    reducers: {
        setCartItemCount: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },
    },
});

export const { setCartItemCount } = CartItemCountSlide.actions;
export default CartItemCountSlide.reducer;
