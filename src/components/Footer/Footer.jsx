import React from 'react';
import './Footer.css';
import { assets } from '../../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        
      <div className='footer-content'>
        
        {/* Left Section */}
        <div className="footer-section-left">
          <img src={assets.logo} alt="PengoX" />
          <p className="footer-tagline">Fast, Fresh, and Always on Time!</p>

          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com/share/12MJvDAc1cG/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a
              href="https://twitter.com/AgnivaMukh23619"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a
              href="https://www.linkedin.com/in/agniva-mukherjee-b2647b21a"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-section-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Terms & Conditions</li>
          </ul>                   
        </div>

        {/* Right Section */}
        <div className="footer-section-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+91 7632005304</li>
            <li>agnivamukherjee8204@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className='footer-copyright'>
        © 2025 by PengoX. Proudly created with Primakre.com
      </p>
    </div>
  );
};

export default Footer;





