import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const DashFooter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let goHomeButton = null;
  if (pathname !== "/dashboard") {
    goHomeButton = (
      <button
        className="dashboard-footer-button icon-button"
        title="Home"
        onClick={() => navigate("/dashboard")}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  return (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
};
export default DashFooter;
