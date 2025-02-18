import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer-list">
          <li><a href="#services" className="footer-link">Services</a></li>
          <li><a href="schedule.html" className="footer-link">Schedule-Appointment</a></li>
          <li><a href="intake.php" className="footer-link">Complete Intake</a></li>
          <li><a href="#contact" className="footer-link">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;