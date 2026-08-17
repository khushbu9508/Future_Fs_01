import React from "react";
import profile from "../assets/profile.png";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo-container">
        <img src={profile} alt="Khushbu" className="profile-pic" />
        <h2 className="logo">Khushbu</h2>
      </div>

      <ul>
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#certification">Certification</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

    </nav>
  );
}

export default Navbar;