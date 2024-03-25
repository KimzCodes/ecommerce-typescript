import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";

type TRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type TResponse = {
  accessToken: string;
  user: { firstName: string; lastName: string; email: string };
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (data: TRegister, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await axios.post<TResponse>("/register", {
        ...data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthRegister;
