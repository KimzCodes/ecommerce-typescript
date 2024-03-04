import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@customTypes/product";

type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "products/actGetWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI;

    try {
      const wishlistResponse = await axios.get<{ item: number }[]>(
        "/wishlist?userId=1"
      );
      if (!wishlistResponse.data.length) {
        return fulfillWithValue([]);
      }
      const concatenatedItemsId = wishlistResponse.data
        .map((el) => `id=${el.item}`)
        .join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actGetWishlist;
