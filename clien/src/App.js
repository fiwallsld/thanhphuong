import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/loginPage";
import UserProvider from "./store/userContext";
import ErrorEl from "./pages/error/ErrorEl";
import ReportDay from "./pages/reportDay/ReportDay";
import ReportPolitic from "./pages/reportPolitic/ReportPolitic";
import ResignGuard from "./pages/resignGuard/ResignGuard";
import ReportEdu from "./pages/reportEdu/ReportEdu";
import ListTB from "./pages/listTB/ListTB";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" index={true} element={<Home />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/reportDay" element={<ReportDay />} />
            <Route path="/reportPolitic" element={<ReportPolitic />} />
            <Route path="/reportEdu" element={<ReportEdu />} />
            <Route path="/resignGuard" element={<ResignGuard />} />
            <Route path="/listTB" element={<ListTB />} />
            <Route path="*" element={<ErrorEl />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
