import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import DonorLogin from "./pages/AuthPages/DonorLogin";
import ReceiverLogin from "./pages/AuthPages/ReceiverLogin";
import ReceiverRegister from "./pages/AuthPages/ReceiverRegister";
import DonorRegister from "./pages/AuthPages/DonorRegister";
import AllShow from "./pages/DonorPage/AllShow";
import ReceiverDashbaord from "./pages/ReceiverDashboard/ReceiverDashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donorLogin" element={<DonorLogin />} />
        <Route path="/receiverLogin" element={<ReceiverLogin />} />
        <Route path="/donorRegister" element={<DonorRegister />} />
        <Route path="/receiverRegister" element={<ReceiverRegister />} />
        <Route path="/donorDashboard" element={<AllShow />} />
        <Route path="/receiverDashboard" element={<ReceiverDashbaord />} />
      </Routes>
    </>
  );
}

export default App;
