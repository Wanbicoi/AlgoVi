import React from "react";
import ReactDOM from "react-dom/client";
import App from "./home.tsx";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlgorithmDetails from "./algorithm-details";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:algorithmName" element={<AlgorithmDetails />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  </React.StrictMode>
);
