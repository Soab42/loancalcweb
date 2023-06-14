import loanReducer from "../features/loan/loanSlice";
import { customMiddleware } from "../features/middlewere/customMiddleware";
const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    loan: loanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware),
});
