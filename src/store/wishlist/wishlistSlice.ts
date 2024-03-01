import { createSlice } from "@reduxjs/toolkit";
import actAddToWishList from "./act/actWishListToggle";
import { itemIsLikedCheckingSelector } from "./selectors";

import { TLoading } from "@customTypes/shared";

interface IWishListState {
  items: number[];
  loading: TLoading;
  error: string | null;
}

const initialState: IWishListState = {
  items: [],
  loading: "idle",
  error: null,
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actAddToWishList.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAddToWishList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.type === "add") {
        state.items.push(action.payload.id);
      } else {
        state.items = state.items.filter((el) => el !== action.payload.id);
      }
    });
    builder.addCase(actAddToWishList.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export { actAddToWishList, itemIsLikedCheckingSelector };
export default wishListSlice.reducer;
