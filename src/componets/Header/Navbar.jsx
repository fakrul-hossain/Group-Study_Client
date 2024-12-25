import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import logo from "../../assets/logoo.png";
import { FaHome, FaList, FaPlus, FaDonate, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { MdLightMode, MdOutlineDarkMode, MdMenu, MdCancel } from "react-icons/md";
import { useTheme } from "../useTheme/useTheme";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { ChangeTheme, mode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Success!", "You have logged out successfully!", "success");
        navigate("/");
      })
      .catch((error) => console.error("Logout Error:", error));
  };

  const activeLink =
    "text-teal-600 dark:text-teal-300 font-semibold border-b-2 border-teal-600 dark:border-teal-300 pb-1 transition-all ease-in-out flex items-center gap-2";
  const normalLink =
    "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-300 transition-all flex items-center gap-2";

  return (
    <div
      className={`bg-white dark:bg-gray-900 shadow-md ${
        isSticky ? "fixed top-0 w-full z-50" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex justify-center items-center gap-2 text-xl font-bold text-teal-600 dark:text-teal-300"
          >
            <img src={logo} alt="Crowdcube Logo" className="h-12 w-12" />
            <span className="hidden sm:inline capitalize">StudySphere</span>
          </NavLink>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsProfileOpen(false);
            }}
            className="md:hidden text-gray-600 dark:text-gray-300 text-2xl"
          >
            {isMenuOpen ? <MdCancel /> : <MdMenu />}
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
              <FaHome />
              Home
            </NavLink>
            <NavLink
              to="/campaigns"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaList />
              All Campaigns
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/addNewCampaign"
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <FaPlus />
                  Add New Campaign
                </NavLink>
                <NavLink
                  to="/myCampaigns"
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <FaList />
                  My Campaigns
                </NavLink>
                <NavLink
                  to="/myDonations"
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <FaDonate />
                  My Donations
                </NavLink>
              </>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button onClick={ChangeTheme} aria-label="Toggle Dark Mode">
              {mode === "dark" ? (
                <MdLightMode className="text-yellow-400 text-2xl" />
              ) : (
                <MdOutlineDarkMode className="text-gray-600 text-2xl dark:text-gray-300" />
              )}
            </button>

            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  title={user.displayName || "User"}
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsMenuOpen(false);
                  }}
                />
                {isProfileOpen && (
                  <div className="absolute p-4 right-0 z-50 mt-2 w-64 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg">
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                      {user.displayName}
                    </p>
                    <hr />
                    <button
                      onClick={handleLogOut}
                      className="block w-full text-left text-sm font-bold bg-teal-500 dark:bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-600 dark:hover:bg-teal-700 transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <FaSignInAlt />
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <FaUserPlus />
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-100 dark:bg-gray-900 border-t mt-2">
            <nav className="flex flex-col gap-2 p-4">
              <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                <FaHome />
                Home
              </NavLink>
              <NavLink
                to="/campaigns"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <FaList />
                All Campaigns
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/addNewCampaign"
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <FaPlus />
                    Add New Campaign
                  </NavLink>
                  <NavLink
                    to="/myCampaigns"
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <FaList />
                    My Campaigns
                  </NavLink>
                  <NavLink
                    to="/myDonations"
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <FaDonate />
                    My Donations
                  </NavLink>
                </>
              )}
              {!user && (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <FaSignInAlt />
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <FaUserPlus />
                    Register
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;