import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth-user/auth.slice";
import contactReducer from "../features/contact/contact.slice";
import relationReducer from "../features/relation/relation.slice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistAuthUserConfig = {
  key: "current-user",
  storage,
};
export const persistedAuthReducer = persistReducer(
  persistAuthUserConfig,
  authReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    contact: contactReducer,
    relation: relationReducer,
  },
});

export const persistor = persistStore(store);
