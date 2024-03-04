import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";

const actToggleWishList = createAsyncThunk(
  "wishList/actToggleWishList",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { wishlist } = getState() as RootState;
    try {
      const withListItems = wishlist.itemsId;
      const idIsExist = withListItems.includes(id);
      if (idIsExist) {
        //get user  whish list
        const userWishList = await axios.get(`wishlist?userId=1`);

        await axios.delete(`wishlist/${userWishList.data[0].id}`);
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

export default actToggleWishList;
