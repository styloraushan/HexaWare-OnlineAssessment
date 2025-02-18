import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <h1 className="logo">AssessPro</h1>
        </Link>
        <nav className="navbar">
  <ul className="navbar-list">
    <li><Link to="#home" className="navbar-link">Home</Link></li> {/* Links to Hero section */}
    <li><Link to="#about" className="navbar-link">About</Link></li> {/* Links to About section */}
    <li><Link to="/services" className="navbar-link">Services</Link></li>
    <li><Link to="/solutions" className="navbar-link">Solutions</Link></li>
    <li><Link to="/testimonials" className="navbar-link">Testimonials</Link></li>
    <li><Link to="/contact" className="navbar-link">Contact</Link></li>
    <li>
      <a href="" className="btn btn-primary">Login & Signup</a>
    </li>
  </ul>
</nav>
      </div>
    </header>
  );
}

export default Header;
