import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actToggleLike = createAsyncThunk(
  "wishList/actToggleWishList",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const withListItems = await axios.get<{ id: number }[]>("/wishlist");

      const withListItemsId = withListItems.data.map((el) => el.id);
      const idIsExist = withListItemsId.includes(id);

      if (idIsExist) {
        //get user  wishlist
        const item = await axios.get(`/wishlist?userId=1&item=${id}`);

        await axios.delete(`/wishlist/${item.data[0].id}`);
        return { id, type: "remove" };
      } else {
        await axios.post("wishlist", {
          userId: 1,
          item: id,
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
