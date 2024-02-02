import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@types/SharedTypes";

type TCategory = { id: number; title: string; prefix: string; img: string };

interface ICategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
