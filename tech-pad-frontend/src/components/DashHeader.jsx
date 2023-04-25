import React from "react";
import { Link } from "react-router-dom";

const DashHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header-container">
        <Link to="/dashboard">
          <h1 className="dashboard-header-title">techNotes</h1>
        </Link>
        <nav className="dashboard-header-nav"></nav>
      </div>
    </header>
  );
};

export default DashHeader;
