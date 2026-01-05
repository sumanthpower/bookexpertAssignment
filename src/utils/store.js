import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    emp: employeeSlice,
    search: searchSlice,
  },
});

export default store;
