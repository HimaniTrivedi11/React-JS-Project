import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import TimeTracking from "./pages/TimeTracking";
import TaskList from "./pages/TaskList";
import TeamMemberStatus from "./pages/TeamMemberStatus ";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  const location = useLocation();
  
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route
          path="/time-tracking"
          element={
            <ProtectedRoute>
              <TimeTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task-list"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-member-status"
          element={
            <ProtectedRoute>
              <TeamMemberStatus />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
