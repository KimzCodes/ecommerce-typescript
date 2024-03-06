import { createSlice } from "@reduxjs/toolkit";

interface IWishlist {
  itemsId: number[];
}

const initialState: IWishlist = {
  itemsId: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
});

export default wishlistSlice.reducer;
