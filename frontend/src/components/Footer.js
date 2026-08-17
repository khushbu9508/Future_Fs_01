import React from "react";
import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      

      <div className="social-icons">
        <a 
          href="https://www.linkedin.com/in/khushbu-kumari-480456291/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>

        <a 
          href="https://github.com/khushbu9508" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>

        <a 
          href="https://wa.me/919508128130" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>

        <a href="mailto:Khushbusinghsk9504@gmail.com">
          <FaEnvelope />
        </a>
      </div>

      <p>© 2026 Your Name. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;