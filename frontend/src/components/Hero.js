import React from "react";
import { ReactTyped } from "react-typed";
import profile from "../assets/profile.png";

function Hero() {
  return (
    <section id="hero" className="hero">
      
      {/* LEFT SIDE */}
      <div className="hero-left">
        <h1>
          Hi, I'm <span className="highlight">Khushbu Kumari</span> 👋
        </h1>

        <ReactTyped
          strings={[
            "MERN Stack Developer 🚀",
            "ServiceNow Developer 💼",
            "Future SDE 👩‍💻"
          ]}
          typeSpeed={50}
          backSpeed={30}
          loop
          className="typing-text"
        />

        <p className="hero-desc">
          Passionate about building scalable web applications and solving 
          real-world problems using modern technologies.
        </p>

        <div className="hero-buttons">
          <a href="#projects">
            <button className="primary-btn">View Projects</button>
          </a>

          <a href="/assets/Resume.pdf" download="Resume.pdf">
         <button className="secondary-btn">Download Resume</button>
         </a>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hero-right">
        <div className="image-wrapper">
          <img src={profile} alt="Khushbu" />
        </div>
      </div>

    </section>
  );
}

export default Hero;