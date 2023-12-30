import React from "react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer-div">
        <p className="copy">
          &copy; {date} - All rights reserved by Tanushri Das
        </p>
        <div className="social-links">
          <a
            className="social-link"
            href="https://www.linkedin.com/in/tanushri-das-06a520194/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="linkedin" />
          </a>
          <a
            className="social-link"
            href="https://www.facebook.com/tanushri.das01?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="facebook" />
          </a>
          <a
            className="social-link"
            href="https://www.youtube.com/watch?v=ZvggB9FT4gM&ab_channel=MuseumofFineArts%2CBoston"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="youtube" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
