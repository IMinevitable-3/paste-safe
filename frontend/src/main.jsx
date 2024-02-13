import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/main.css";
import { ApiProvider } from "./context/apiContext";

import { BrowserRouter, Route, Routes } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
