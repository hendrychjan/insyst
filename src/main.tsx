import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navigation/Navbar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
