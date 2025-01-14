import React from "react";
import { Link } from "react-router-dom";
import "../css/landing.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-content">
          <h1>Welcome to Adventure Atlas</h1>
          <p>
            Explore. Plan. Create. Your gateway to unforgettable adventures starts here.
          </p>
          <div className="landing-buttons">
            <Link to="/login">
              <button className="landing-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="landing-btn">Sign Up</button>
            </Link>
          </div>
          <div className="landing-footer">
            <p>
              New to Adventure Atlas?{" "}
              <Link to="/signup">Create an account</Link> today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
