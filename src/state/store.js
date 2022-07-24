import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducer";

const store = configureStore({
  reducer: {
    post: blogReducer,
  },
});

export default store;
