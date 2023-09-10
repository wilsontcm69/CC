import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";
import { Toaster } from "react-hot-toast";

// Import pages
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AddCompany from "./pages/AddCompany";
import ViewCompany from "./pages/ViewCompany";
import AddSupervisor from "./pages/AddSupervisor";
import ViewSupervisor from "./pages/ViewSupervisor";
import AddStudent from "./pages/AddStudent";
import ViewStudent from "./pages/ViewStudent";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/Dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="AddCompany" element={<AddCompany />} />
          <Route path="ViewCompany" element={<ViewCompany />} />
          <Route path="AddSupervisor" element={<AddSupervisor />} />
          <Route path="ViewSupervisor" element={<ViewSupervisor />} />
          <Route path="AddStudent" element={<AddStudent />} />
          <Route path="ViewStudent" element={<ViewStudent />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
