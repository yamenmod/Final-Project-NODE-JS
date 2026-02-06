import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SurfSpots from "./pages/SurfSpots";

function App() {
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  // Load user from storage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowWelcome(false);
    }
  }, []);

  if (showWelcome && !user) {
    return <Welcome onGetStarted={() => setShowWelcome(false)} />;
  }

  return (
    <BrowserRouter>
      {!user ? (
        <Login
          onLoginSuccess={(u) => {
            localStorage.setItem("user", JSON.stringify(u));
            setUser(u);
          }}
        />
      ) : (
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/spots" element={<SurfSpots user={user} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
