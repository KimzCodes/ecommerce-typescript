import { createSlice } from "@reduxjs/toolkit";
import actToggleLike from "./act/actToggleLike";
import actGetWishlist from "./act/actGetWishlist";
import { TLoading } from "@customTypes/shared";
import { TProduct } from "@customTypes/product";

interface IWishListState {
  itemsId: number[];
  error: string | null;
  loading: TLoading;
  recordsFullInfo: TProduct[];
}

const initialState: IWishListState = {
  itemsId: [],
  error: null,
  loading: "idle",
  recordsFullInfo: [],
};

const wishlistSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.recordsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actToggleLike.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actToggleLike.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
        state.recordsFullInfo = state.recordsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actToggleLike.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // products for wish list
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.recordsFullInfo = action.payload;
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export { actToggleLike, actGetWishlist };
export const { productsCleanUp } = wishlistSlice.actions;
export default wishlistSlice.reducer;
