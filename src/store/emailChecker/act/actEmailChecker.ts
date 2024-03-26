import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

const actEmailChecker = createAsyncThunk(
  "emailChecker/actEmailChecker",
  async (email: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
    try {
      const response = await axios.get(`/users?email=${email}`);
      if (!response.data.length) {
        return fulfillWithValue({ status: "free", email });
      }

      return fulfillWithValue({ status: "notFree", email });
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actEmailChecker;
