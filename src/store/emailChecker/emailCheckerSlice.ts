import { createSlice } from "@reduxjs/toolkit";
import actEmailChecker from "./act/actEmailChecker";
import { isString } from "@types";

interface IEmailCheckerState {
  enteredEmail: null | string;
  emailChecking: "idle" | "processing" | "notFree" | "free" | "error";
  error: null | string;
}

const initialState: IEmailCheckerState = {
  enteredEmail: null,
  emailChecking: "idle",
  error: null,
};

const emailChecker = createSlice({
  name: "emailChecker",
  initialState,
  reducers: {
    resetEmailChecker: (state) => {
      state.enteredEmail = null;
      state.emailChecking = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actEmailChecker.pending, (state) => {
      state.enteredEmail = null;
      state.emailChecking = "processing";
      state.error = null;
    });
    builder.addCase(actEmailChecker.fulfilled, (state, action) => {
      state.enteredEmail = action.payload.email;
      if (action.payload.status === "notFree") {
        state.emailChecking = "notFree";
      } else {
        state.emailChecking = "free";
      }
    });
    builder.addCase(actEmailChecker.rejected, (state, action) => {
      state.emailChecking = "error";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actEmailChecker };
export const { resetEmailChecker } = emailChecker.actions;
export default emailChecker.reducer;
