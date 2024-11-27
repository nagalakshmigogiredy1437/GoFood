import React from "react";
import LandingPage from "./vendorDashboard/pages/LandingPage";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotFound from "./vendorDashboard/Components/NotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
