import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MovieContextProvider } from "./context/Context";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <MovieContextProvider>
    <App />
  </MovieContextProvider>
);
