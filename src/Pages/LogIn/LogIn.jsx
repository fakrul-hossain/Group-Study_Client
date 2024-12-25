import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [email, setEmail] = useState("");
  const [passwordType, setPasswordType] = useState("password"); // Password toggle state

  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        Swal.fire(
          "Successfully Logged In",
          "You have successfully logged in with email and password!",
          "success"
        );
        e.target.reset();
        navigate("/");
      })
      .catch(() => {
        Swal.fire(
          "Login Failed",
          "Incorrect email or password. Please try again!",
          "error"
        );
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire(
          "Successfully Logged In",
          "You have successfully logged in with Google!",
          "success"
        );
        navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col lg:flex-row justify-center flex-1">
      {/* Image Section */}
      <div className="flex-1 bg-indigo-100 dark:bg-indigo-900 text-center hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
          }}
        ></div>
      </div>
  
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
            Log In
          </h2>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Enter your details to log in.
          </p>
  
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Password</label>
              <input
                type={passwordType}
                name="password"
                placeholder="Enter your password"
                className="w-full mt-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                required
              />
              {/* Password toggle button */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-10 right-4 text-gray-500 dark:text-gray-400 focus:outline-none"
              >
                {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-teal-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-teal-400 transition duration-300"
            >
              Log In
            </button>
          </form>
  
          <div className="mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 dark:bg-indigo-700 text-gray-800 dark:text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:shadow-sm focus:shadow-outline mx-auto"
            >
              <div className="bg-white p-2 rounded-full">
                <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                  <path
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                    fill="#34a853"
                  />
                  <path
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                    fill="#ea4335"
                  />
                </svg>
              </div>
              <span className="ml-4">Log In with Google</span>
            </button>
          </div>
  
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <NavLink
              to="/register"
              className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  </div>
  
  
  );
};

export default LogIn;
