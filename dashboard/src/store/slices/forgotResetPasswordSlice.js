import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    clearAllError(state, action) {
      state.error = null;
      state = state;
    },
  },
});

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/user/password/forgot",
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(forgotResetPassSlice.actions.forgotPasswordSuccess(data.message));
    dispatch(forgotResetPassSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      forgotResetPassSlice.actions.forgotPasswordFailed(
        error.response.data.message
      )
    );
  }
};

export const resetPassword =
  (token, password, confirmpassword) => async (dispatch) => {
    dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/user/password/reset/${token}`,
        { password, confirmpassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(forgotResetPassSlice.actions.resetPasswordSuccess(data.message));
      dispatch(forgotResetPassSlice.actions.clearAllError());
    } catch (error) {
      dispatch(
        forgotResetPassSlice.actions.resetPasswordFailed(
          error.response.data.message
        )
      );
    }
  };

export const clearAllForgotPasswordError = () => (dispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllError());
};

export default forgotResetPassSlice.reducer;
