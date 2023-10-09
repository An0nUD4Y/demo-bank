// Import necessary modules and functions
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Choose your storage method (e.g., local storage)

import userReducer from "../features/user";

const persistConfig = {
  key: "user",
  storage,
};

// Wrap your reducer with persistReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
