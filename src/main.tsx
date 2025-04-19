import * as yup from "yup";
import axios from "axios";
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
import { AuthProvider } from "./providers/AuthProvider";
import LogoutPage from "./pages/logout/LogoutPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { ProtectedRoute } from "./providers/ProtectedRoute";

// Setup axios headers
axios.defaults.baseURL = import.meta.env.VITE_API_URL!;

// Setup yup validation error messages
yup.setLocale({
  mixed: {
    required: Const.FormFeedback.RequiredUnsatisfied,
  },
});

// Setup the application router
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          
          {/* Profile */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Common */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
