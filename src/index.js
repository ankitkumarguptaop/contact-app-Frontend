import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
//</React.StrictMode>  
);
