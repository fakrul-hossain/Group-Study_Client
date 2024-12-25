import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateAUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const img = e.target.img.value;

    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!regex.test(password)) {
      Swal.fire(
        "Password Error",
        "Password must contain an uppercase letter, a lowercase letter, and be at least 6 characters long.",
        "error"
      );
      return;
    }

    createUser(email, password)
      .then(() => {
        Swal.fire("Success", "Registration successful!", "success");
        updateAUser(name, img).then(() => {
          setUser((prev) => ({
            ...prev,
            displayName: name,
            photoURL: img,
          }));
          navigate("/");
        });
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      });

    e.target.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
  <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col lg:flex-row justify-center flex-1">
    {/* Form Section */}
    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
      <div className="text-center">
        <NavLink
          to="/"
          className="flex justify-center items-center gap-2 text-xl font-bold text-teal-600 dark:text-teal-400"
        >
          <img src={logo} alt="Crowdcube Logo" className="h-12 w-12" />
          <span className="hidden sm:inline">Crowdcube</span>
        </NavLink>
      </div>
      <div className="mt-12 flex flex-col items-center">
        <h1 className="text-2xl xl:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Sign Up
        </h1>
        <form onSubmit={handleRegister} className="w-full flex-1 mt-8">
          <div className="mx-auto max-w-xs">
            {/* Name Field */}
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full px-8 py-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
              required
            />
            {/* Email Field */}
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-8 py-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600 mt-5"
              required
            />
            {/* Image Field */}
            <input
              name="img"
              type="text"
              placeholder="Photo URL"
              className="w-full px-8 py-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600 mt-5"
              required
            />
            {/* Password Field */}
            <div className="relative mt-5">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-8 py-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
                required
              />
              <div
                className="absolute top-4 right-4 cursor-pointer text-gray-600 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-5 tracking-wide font-semibold bg-teal-600 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none dark:bg-teal-500 dark:hover:bg-teal-400"
            >
              <span className="ml-3">Sign Up</span>
            </button>
            {/* Redirect Link */}
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-teal-600 hover:underline font-medium dark:text-teal-400"
              >
                Log In
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>

    {/* Image Section */}
    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
      <div
        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
        }}
      ></div>
    </div>
  </div>
</div>


  );
};

export default SignUp;
