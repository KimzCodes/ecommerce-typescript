import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@store/index";
import { TProduct } from "@customTypes/product";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsIds = Object.keys(cart.items);
    if (!itemsIds.length) {
      return false;
    }

    try {
      const concatenatedItemsIds = itemsIds.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsIds}`
      );

      const data = response.data;
      return data.map((el) => ({
        ...el,
        quantity: cart.items[el.id],
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actGetProductsByItems;
