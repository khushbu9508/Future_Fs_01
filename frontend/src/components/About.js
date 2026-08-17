import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaJava,
  FaTools
} from "react-icons/fa";
import { SiMongodb } from "react-icons/si";

function About() {
  return (
    <section id="about" className="about-skills">
      <div className="about-left" data-aos="fade-right">
        <h2>About Me</h2>
        <p>
          Hi! I’m <span className="highlight">Khushbu Kumari</span>, a passionate developer building modern web applications using React, Node.js, and MongoDB.
        </p>
        <p>
          I enjoy learning new technologies and creating interactive, responsive, and user-friendly web experiences.
        </p>
        <div className="about-buttons">
          <a href="#projects">
            <button className="primary-btn">View My Work</button>
          </a>
          <a href="#contact">
            <button className="secondary-btn">Contact Me</button>
          </a>
        </div>
      </div>

      <div className="about-right" data-aos="fade-left">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-box html"><FaHtml5 /> <span>HTML</span></div>
          <div className="skill-box css"><FaCss3Alt /> <span>CSS</span></div>
          <div className="skill-box js"><FaJsSquare /> <span>JavaScript</span></div>
          <div className="skill-box react"><FaReact /> <span>React</span></div>
          <div className="skill-box node"><FaNodeJs /> <span>Node.js</span></div>
          <div className="skill-box mongo"><SiMongodb /> <span>MongoDB</span></div>
          <div className="skill-box servicenow"><FaTools /> <span>ServiceNow</span></div>
          <div className="skill-box java"><FaJava /> <span>Java</span></div>
        </div>
      </div>
    </section>
  );
}

export default About;