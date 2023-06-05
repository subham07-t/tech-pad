import React from "react";
import { Link, Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
const DashLayout = () => {
  const token = useSelector(selectCurrentToken);
  if (!token)
    return (
      <p className="errmsg">
        <Link to="/login">Kindly login to access the data</Link>.
      </p>
    );
  return (
    <>
      <DashHeader />
      <div className="dashboard-container">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;
