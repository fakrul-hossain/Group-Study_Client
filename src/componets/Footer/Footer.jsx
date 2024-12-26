import React from "react";
import logo from "../../assets/logo.png";
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Bounce, Fade } from "react-awesome-reveal";

const Footer = () => {
  return (
    <Fade>
      <footer className="bg-teal-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
            {/* Logo */}
            <div className="col-span-1">
              <h2 className="text-2xl font-bold">Study-Sphere</h2>
              <p className="mt-2 text-sm text-gray-400">
                Empowering group study through assignments. Learn, collaborate, and grow together!
              </p>
            </div>

            {/* Get Started */}
            <div>
              <h3 className="text-lg font-bold mb-4">GET STARTED</h3>
              <ul className="space-y-2">
                <li><a href="/create-assignment" className="hover:underline">Create an Assignment</a></li>
                <li><a href="/login" className="hover:underline">Login</a></li>
                <li><a href="/register" className="hover:underline">Sign Up</a></li>
              </ul>
            </div>

            {/* Browse */}
            <div>
              <h3 className="text-lg font-bold mb-4">BROWSE</h3>
              <ul className="space-y-2">
                <li><a href="/assignments" className="hover:underline">View All Assignments</a></li>
                <li><a href="/my-assignments" className="hover:underline">My Assignments</a></li>
                <li><a href="/pending-assignments" className="hover:underline">Pending Assignments</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold mb-4">RESOURCES</h3>
              <ul className="space-y-2">
                <li><a href="/faq" className="hover:underline">FAQ</a></li>
                <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                <li><a href="/help" className="hover:underline">Help Center</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">LEGAL</h3>
              <ul className="space-y-2">
                <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-bold mb-4">FOLLOW US</h3>
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
