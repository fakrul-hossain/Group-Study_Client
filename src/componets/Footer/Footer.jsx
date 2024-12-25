import React from "react";
import logo from "../../assets/logo.png";
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Bounce, Fade } from "react-awesome-reveal";
// import { Typography } from "@material-tailwind/react";
// import { FaFacebook } from "react-icons/fa";
// import { IoLogoTwitter,IoLogoLinkedin } from "react-icons/io";



const Footer = () => {
  return (
   
  <Fade>
     <footer className="bg-teal-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
        {/* Logo */}
        <div className="col-span-1">
          <h2 className="text-2xl font-bold">Crowdcube</h2>
        </div>

        {/* Get Started */}
        <div>
          <h3 className="text-lg font-bold mb-4">GET STARTED</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Start a Fundraise</a></li>
            <li><a href="#" className="hover:underline">Investor Signup</a></li>
            <li><a href="#" className="hover:underline">Account Login</a></li>
          </ul>
        </div>

        {/* Browse */}
        <div>
          <h3 className="text-lg font-bold mb-4">BROWSE</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Trending</a></li>
            <li><a href="#" className="hover:underline">Recently Funded</a></li>
            <li><a href="#" className="hover:underline">New & Noteworthy</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-bold mb-4">RESOURCES</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Guidelines</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-bold mb-4">LEGAL</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-bold mb-4">FOLLOW</h3>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-white hover:text-teal-300 text-2xl"><FaTwitter /></a>
          <a href="#" className="text-white hover:text-teal-300 text-2xl"><FaLinkedin /></a>
        </div>
      </div>
    </div>
  </footer>
  </Fade>
  );
};

export default Footer;
