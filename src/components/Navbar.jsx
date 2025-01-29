import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiHome} from "react-icons/fi";
import { TbUserSquare } from "react-icons/tb";
import { RiCommunityLine } from "react-icons/ri";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have been successfully logged out.",
    }).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/60 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                <a href="/home">ConnectMate</a>
              </h1>
            </div>

            <div className="hidden sm:flex sm:items-center">
              <div className="flex space-x-4">
                <Link
                  to="/home"
                  className="relative text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
                <Link
                  to="/recommendation"
                  className="relative text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                  onClick={handleLinkClick}
                >
                  Recommendation
                </Link>
                <div
                  className="relative inline-block text-left"
                  ref={dropdownRef}
                >
                  <TbUserSquare
                    className="h-8 w-8 text-black cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  />
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-200 border border-gray-200 rounded-md shadow-lg z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-md text-black hover:bg-gray-100"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleLinkClick();
                        }}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-md text-black hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex sm:hidden">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {isSidebarOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-white z-50 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-2xl font-bold text-blue-600">ConnectMate</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-black hover:text-gray-600 focus:outline-none"
            >
              <FiX className="h-8 w-8" />
            </button>
          </div>

          {user && (
            <span className="text-lg font-semibold text-black mt-4 flex flex-col items-start ml-4 gap-4">
              Username: {user.name || "User"}
            </span>
          )}
          <div className="mt-4 space-y-4 text-black">
            <Link
              to="/home"
              className="flex items-center space-x-2 px-4 py-2 text-lg font-medium hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              <FiHome className="h-5 w-5 text-blue-600" />
              <span>Home</span>
            </Link>
            <Link
              to="/recommendation"
              className="flex items-center space-x-2 px-4 py-2 text-lg font-medium hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              <RiCommunityLine className="h-5 w-5 text-blue-600" />
              <span>Recommendation</span>
            </Link>
            <div className="mt-4 flex flex-col items-start ml-4 gap-4">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-600 transition duration-300 transform hover:scale-105"
              >
                <Link to="/profile">Profile</Link>
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsSidebarOpen(false);
                }}
                className="mt-4 bg-gradient-to-r from-blue-600 to-red-500 text-white py-2 px-4 rounded-md font-medium hover:bg-red-600 transition duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
