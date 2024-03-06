import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actToggleLike = createAsyncThunk(
  "wishlist/actToggleLike",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const wishlistItems = await axios.get<{ id: number }[]>(
        "/wishlist?userId=1"
      );
      const wishlistItemsId = wishlistItems.data.map((el) => el.id);
      const idIsExist = wishlistItemsId.includes(id);

      if (idIsExist) {
        const selectedItem = await axios.get(`/wishlist?userId=1&itemId=${id}`);

        await axios.delete(`/wishlist/${selectedItem.data[0].id}`);
        return { id, type: "remove" };
      } else {
        await axios.post("wishlist", {
          userId: 1,
          itemId: id,
        });
        return { id, type: "add" };
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

export default actToggleLike;
