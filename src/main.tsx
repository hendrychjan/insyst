import * as yup from "yup";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navigation/Navbar";
import LoginPage from "./pages/login/LoginPage";
import { Const } from "./const";
import DashboardPage from "./pages/dashboard/DashboardPage";

// Setup yup validation error messages
yup.setLocale({
  mixed: {
    required: Const.FormFeedback.RequiredUnsatisfied,
  },
});

// Setup the application router
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
