import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header";

import Home from "../pages/Home";
import ListWork from "../pages/ListWork";
import ListWorkCalendar from "../pages/ListWorkCalendar";
import ListWorkDetail from "../pages/ListWorkDetail";
import Login from "../pages/Login";
import ManagerUser from "../pages/ManagerUser";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" forceRefresh={true} element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/manager-user" element={<ManagerUser />} />
      <Route path="/list-work/:id" element={<ListWork />} />
      <Route
        path="/list-work-detail/:idDepart/:idTask"
        element={<ListWorkDetail />}
      />
      <Route
        path="/list-work-calendar/:idDepart/:status"
        element={<ListWorkCalendar />}
      />
    </Routes>
  );
};

export default Routers;
