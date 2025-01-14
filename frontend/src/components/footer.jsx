import React from "react";
import "./footer.css"; // Assuming you have a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>AdventureAtlas - Travel Planners</h3>
        
        <div className="footer-details">
          <div className="footer-info">
            <p><strong>About Us:</strong> We make travel planning easy and fun!</p>
            <p><strong>Contact:</strong> info@adventureatlas.com | +91 9583285643</p>
          </div>
          <div className="footer-social">
            <p><strong>Follow Us:</strong></p>
            <div className="social-links">
              <a href="https://www.instagram.com/thilak_patel05/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/thilak.patel.1/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer">X.com</a>
            </div>
          </div>
        </div>

        <p className="footer-copyright">© 2025 AdventureAtlas. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
