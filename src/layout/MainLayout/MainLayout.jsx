import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../../componets/Footer/Footer";
import { ToastContainer } from "react-toastify";
// importing aos
import Navbar from "../../componets/Header/Navbar";

const MainLayout = () => {
  return (
    <div className="flex dark:bg-black flex-col min-h-screen  overflow-hidden">
      <ToastContainer />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
