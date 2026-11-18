
import React, { useState } from "react";
import {
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { Menu, X, LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("googleUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isOpen, setIsOpen] = useState(false);

  // Google Login Success
  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      console.log(decoded);

      setUser(decoded);

      localStorage.setItem(
        "googleUser",
        JSON.stringify(decoded)
      );

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Google Logout
  const handleLogout = () => {
    googleLogout();

    localStorage.removeItem("googleUser");

    setUser(null);

    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            DevSpace
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-600 hover:text-indigo-600">
              Home
            </a>

            <a href="/about" className="text-gray-600 hover:text-indigo-600">
              About
            </a>

            <a href="/services" className="text-gray-600 hover:text-indigo-600">
              Services
            </a>

            <a href="/contact" className="text-gray-600 hover:text-indigo-600">
              Contact
            </a>
          </div>

          {/* Google Authentication */}
          <div className="hidden md:flex items-center gap-4">

            {user ? (
              <div className="flex items-center gap-3">

                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border"
                />

                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {user.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2
                  bg-red-50 text-red-600 rounded-lg
                  hover:bg-red-100 transition"
                >
                  <LogOut size={17} />
                  Logout
                </button>

              </div>
            ) : (

              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.log("Login Failed")}
                theme="outline"
                shape="rectangular"
                size="large"
                text="signin_with"
              />

            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-5 space-y-4">

            <a href="/" className="block text-gray-600">
              Home
            </a>

            <a href="/about" className="block text-gray-600">
              About
            </a>

            <a href="/services" className="block text-gray-600">
              Services
            </a>

            <a href="/contact" className="block text-gray-600">
              Contact
            </a>

            <div className="pt-3">

              {user ? (
                <div className="flex items-center gap-3">

                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />

                  <span className="text-sm font-semibold">
                    {user.name}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 px-3 py-2 rounded-lg"
                  >
                    Logout
                  </button>

                </div>
              ) : (
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={() => console.log("Login Failed")}
                  text="signin_with"
                />
              )}

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
