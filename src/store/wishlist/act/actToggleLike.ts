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
        const userWishlist = await axios.get("/wishlist?userId=1");
        await axios.delete("wishlist/");
      } else {
        await axios.post("wishlist", {
          userId: 1,
          itemId: id,
        });
        return { id, type: "add" };
      }
    } catch (error) {}
  }
);

export default actToggleLike;
