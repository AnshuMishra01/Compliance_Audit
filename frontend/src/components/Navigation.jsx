import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserType } from "../utils/auth";
import logo from "../assets/Bank_of_Baroda_logo_orange_background.png";
import "../index.css";
import { useAuth0 } from "@auth0/auth0-react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userType = getUserType();
  const { logout, user, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="transition fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-blue-900 to-black text-white shadow-lg backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* <img className="w-16 md:w-20 lg:w-24" src={logo} alt="Bank of Baroda Logo" /> */}
            <div className="text-xl font-sans md:text-2xl font-nunito font-bold tracking-wider text-neon-blue">
              {userType === "officer" ? "OFFICER PORTAL" : "EMPLOYEE PORTAL"}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl focus:outline-none">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className={`flex-col md:flex md:flex-row items-center md:space-x-6 space-y-6 md:space-y-0 mt-4 md:mt-0 ${isOpen ? "flex" : "hidden"}`}>
            {userType === "officer" ? (
              <>
                <Link to="/officer/dashboard" className="neon-hover font-sans">
                  Dashboard
                </Link>
                <Link to="/officer/guidelines" className="neon-hover">
                  Guidelines
                </Link>
                <Link to="/officer/help" className="neon-hover">
                  Help
                </Link>
                {isAuthenticated && <p>{user.email}</p>}
              </>
            ) : (
              <>
                <Link to="/employee/dashboard" className="neon-hover">
                  Dashboard
                </Link>
                <Link to="/employee/guidelines" className="neon-hover">
                  Guidelines
                </Link>
                <Link to="/employee/help" className="neon-hover">
                  Help
                </Link>
                {isAuthenticated && <p>{user.email}</p>}
              </>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
