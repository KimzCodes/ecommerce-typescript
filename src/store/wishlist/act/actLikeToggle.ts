import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const wishlistItems = await axios.get<{ productId: number }[]>(
        "/wishlist?userId=1"
      );

      const wishlistItemsIds = wishlistItems.data.map((el) => el.productId);
      const idIsExist = wishlistItemsIds.includes(id);

      if (idIsExist) {
        const record = await axios.get(`wishlist?userId=1&productId=${id}`);
        await axios.delete(`wishlist/${record.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post("/wishlist", { userId: 1, productId: id });
        return { type: "add", id };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actLikeToggle;
