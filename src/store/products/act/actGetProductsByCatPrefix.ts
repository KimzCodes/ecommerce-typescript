import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { TProduct } from "@customTypes/Product";

type TResponse = TProduct[];

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (catPrefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response: AxiosResponse<TResponse> = await axios.get<TResponse>(
        `http://localhost:5005/products?cat_prefix=${catPrefix}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        // Handle other types of errors
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actGetProductsByCatPrefix;
