import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RenewMartLandingPage from "./Components/RenewMartLandingPage";
import Login from "./Components/Login";
import Routingpage from "./Components/Routingpage";
import Sell from "./Components/Sell";
import { AuthProvider } from "./AuthContext";
import Signuppage from "./Signuppage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RenewMartLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Routingpage/*" element={<Routingpage />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/signup" element={<Signuppage />} /> {/* Add signup route */}
        </Routes>
      </Router>
      
    </AuthProvider>
  );
};

export default App;







