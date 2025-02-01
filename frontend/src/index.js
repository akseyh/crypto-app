import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SymbolsList from "./pages/SymbolsList";
import SymbolDetail from "./pages/SymbolDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SymbolsList />} />
        <Route path="/:symbol" element={<SymbolDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
