import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import logo from "../../assets/logoo.png";
import {
  FaHome,
  FaList,
  FaPlus,
  FaDonate,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import {
  MdLightMode,
  MdOutlineDarkMode,
  MdMenu,
  MdCancel,
  MdOutlinePending,
} from "react-icons/md";
import { useTheme } from "../useTheme/useTheme";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { ChangeTheme, mode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
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
            <img src={logo} alt="StudySphere Logo" className="h-12 w-12" />
            <span className="hidden sm:inline">StudySphere</span>
          </NavLink>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsDropdownOpen(false); // Close dropdown when menu is opened
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
              to="/AllAssignments"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaList />
              All Assignments
            </NavLink>
            {user && (
              <>
                
                <NavLink
                  to="/pendingAssignments"
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <MdOutlinePending />

                  Pending Assignments
                </NavLink>
              </>
            )}
          </nav>

          {/* Auth Section */}
          <div className="relative flex items-center gap-4">
            <button onClick={ChangeTheme} aria-label="Toggle Dark Mode">
              {mode === "dark" ? (
                <MdLightMode className="text-yellow-400 text-2xl" />
              ) : (
                <MdOutlineDarkMode className="text-gray-600 text-2xl dark:text-gray-300" />
              )}
            </button>

            {user ? (
              <div className="relative inline-block">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full cursor-pointer border-2 border-teal-500 hover:border-teal-700"
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    setIsMenuOpen(false); // Close menu when dropdown is opened
                  }}
                />

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
                    {/* Header with User Info */}
                    <div className="bg-teal-500 dark:bg-teal-700 text-white px-4 py-2 flex items-center gap-3">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/40"}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full border-2 border-white"
                      />
                      <div>
                        <p className="font-semibold">{user.displayName || "User"}</p>
                        <p className="text-sm opacity-80">{user.email}</p>
                      </div>
                    </div>

                    {/* Dropdown Options */}
                    <div className="py-2">
                  <div className="px-4">
                  <NavLink
                  to="/AddNewAssignments"
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <FaPlus />
                  AddNewAssignments
                </NavLink>
                <NavLink
                  to="/myAssignment"
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <FaList />
                  My Assignment
                </NavLink>
                  </div>
                      <button
                        onClick={() => navigate("/campaigns")}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Settings
                      </button>
                      <button
                        onClick={handleLogOut}
                        className="block w-full px-4 py-2 font-semibold dark:hover:text-white text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-800"
                      >
                        Logout
                      </button>
                    </div>
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
                to="/AllAssignments"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <FaList />
                AllAssignments
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/AddNewAssignments"
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <FaPlus />
                    Add New Campaign
                  </NavLink>
                  <NavLink
                    to="/MyAssignments"
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <FaList />
                    My Campaigns
                  </NavLink>
                  <NavLink
                    to="/PendingAssignments"
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
