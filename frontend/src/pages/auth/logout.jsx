import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login"); 
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>You have been logged out</h2>
      <p>Redirecting you to the login page...</p>
    </div>
  );
};

export default Logout;
