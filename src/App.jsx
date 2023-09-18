import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { UserRoleProvider } from "./UserRoleContext";

import "./css/style.css";
import { Toaster } from "react-hot-toast";

// Import pages
import AdminSignIn from "./pages/AdminSignIn";
import SupervisorSignIn from "./pages/SupervisorSignIn";
import StudentSignIn from "./pages/StudentSignIn";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";
import AddCompany from "./pages/AddCompany";
import ViewCompany from "./pages/ViewCompany";
import AddSupervisor from "./pages/AddSupervisor";
import ViewSupervisor from "./pages/ViewSupervisor";
import AddStudent from "./pages/AddStudent";
import ViewStudent from "./pages/ViewStudent";
import Home from "./pages/Home";
import SupervisorHome from "./pages/SupervisorHome";
import StudentHome from "./pages/StudentHome";
import EditCompany from "./pages/EditCompany";
import EditSupervisor from "./pages/EditSupervisor";
import EditStudent from "./pages/EditStudent";
import Evaluation from "./pages/Evaluation";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
      <UserRoleProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="AdminSignIn" element={<AdminSignIn />} />
            <Route path="SupervisorSignIn" element={<SupervisorSignIn />} />
            <Route path="SupervisorHome" element={<SupervisorHome />} />
            <Route path="SupervisorHome/:id" element={<Evaluation />} />
            <Route path="StudentSignIn" element={<StudentSignIn />} />
            <Route path="StudentHome" element={<StudentHome />} />
            <Route path="Dashboard" element={<Dashboard />}>
              <Route index element={<Main />} />
              <Route path="Main" element={<Main />} />
              <Route path="AddCompany" element={<AddCompany />} />
              <Route path="ViewCompany" element={<ViewCompany />} />
              <Route path="EditCompany/:id" element={<EditCompany />} />
              <Route path="AddSupervisor" element={<AddSupervisor />} />
              <Route path="ViewSupervisor" element={<ViewSupervisor />} />
              <Route path="EditSupervisor/:id" element={<EditSupervisor />} />
              <Route path="AddStudent" element={<AddStudent />} />
              <Route path="ViewStudent" element={<ViewStudent />} />
              <Route path="EditStudent/:id" element={<EditStudent />} />
            </Route>
          </Routes>
          <Toaster position="top-right" />
      </UserRoleProvider> 
  );
}

export default App;
