import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OverlayStatusSlideState {
  status: boolean;
}

const initialState: OverlayStatusSlideState = {
  status: true,
};

const overlayStatusSlide = createSlice({
  name: "overlayStatusSlide",
  initialState,
  reducers: {
    setOverlayStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const { setOverlayStatus } = overlayStatusSlide.actions;
export default overlayStatusSlide.reducer;