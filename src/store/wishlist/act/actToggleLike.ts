import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actToggleLike = createAsyncThunk(
  "wishlist/actToggleLike",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const;
  }
);

export default actToggleLike;
