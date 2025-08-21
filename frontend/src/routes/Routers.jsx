/* eslint-disable no-unused-vars */
import React from "react";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Centers from "../pages/labCenters/Centers";
import CenterDetails from "../pages/labCenters/CenterDetails";
import Dashboard from "../dashboard/center-account/Dashboard";
import MyAccount from "../dashboard/user-account/MyAccount";

import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/centers" element={<Centers />} />
      <Route path="/centers/:id" element={<CenterDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/services" element={<Services />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["patient"]}>
            {" "}
            <MyAccount />{" "}
          </ProtectedRoutes>
        }
      />
      <Route
        path="/centers/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["center"]}>
            {" "}
            <Dashboard />{" "}
          </ProtectedRoutes>
        }
      />
    </Routes>
    // <div>Routes</div>
  );
};

export default Routers;
