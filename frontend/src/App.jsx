import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage.jsx";
import Destination from "./pages/destinations.jsx";
import Planner from "./pages/planner.jsx";
import Scheduler from "./pages/scheduler.jsx";
import Budget from "./pages/budget.jsx";
import Weather from "./pages/weather.jsx";
import Checklist from "./pages/checklist.jsx";
import Calendar from "./pages/calender.jsx";
import Itinerary from "./pages/itinerary.jsx";
import Login from "./pages/auth/login.jsx";  
import Signup from "./pages/auth/signup.jsx";
import Logout from "./pages/auth/logout.jsx";
import LandingPage from "./components/LandingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/destination"
          element={
            <ProtectedRoute>
              <Destination />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <Planner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduler"
          element={
            <ProtectedRoute>
              <Scheduler />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <Budget />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          }
        />
        <Route
          path="/packing"
          element={
            <ProtectedRoute>
              <Checklist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/itinerary"
          element={
            <ProtectedRoute>
              <Itinerary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
