import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./slices/userSlice";
import forgotPasswordReduser from "./slices/forgotResetPasswordSlice";
import messageReducer from "./slices/messageSlice";
import timelineReducer from "./slices/timelineSlice";
import skillReducer from "./slices/skillSlice";
import softwareApplicationReducer from "./slices/softwareApplicationSlice";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    user: userReduser,
    forgotPassword: forgotPasswordReduser,
    messages: messageReducer,
    timeline: timelineReducer,
    skill: skillReducer,
    softwareApplications: softwareApplicationReducer,
    project: projectReducer,
  },
});
