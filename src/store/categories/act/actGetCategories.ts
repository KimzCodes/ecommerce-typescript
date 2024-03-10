import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@util";

import { TCategory } from "@customTypes/category";

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>("/category");
      return response.data;
    } catch (error) {
      rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
