import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { userHook } from "./context/UserContext";
import RecommendationsPage from "./pages/RecommendationPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

function App() {
  const { user, setUser } = userHook();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignUpPage />} />

        {user && (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/recommendation" element={<RecommendationsPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
