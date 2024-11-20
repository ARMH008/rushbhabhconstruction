/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import HomePage from "./page/HomePage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import SigninPage from "./page/SigninPage";
import SignupPage from "./page/SingupPage";
import AllReportPage from "./page/AllReportPage";
import UploadReportForm from "./page/UploadReportForm";
import Dashboard from "./page/Dashboard";
import Chart from "./page/chat";
import Allchart from "./page/overallchart";
import Newrepo from "./page/pdfreport";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/allReport" element={<AllReportPage />} />
        <Route path="/uploadReport" element={<UploadReportForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/detailchart" element={<Allchart />} />
        <Route path="/pdf" element={<Newrepo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
