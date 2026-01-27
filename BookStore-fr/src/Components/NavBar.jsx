import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const [openHam, setOpenHam] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [userInitial, setUserInitial] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const email = decoded.sub; // backend should send email/username in 'sub'
        setUserInitial(email.charAt(0).toUpperCase());
      } catch (err) {
        setUserInitial(null);
      }
    } else {
      setUserInitial(null);
    }
  };

  // Check token on mount + listen to login/logout events
  useEffect(() => {
    checkToken();
    window.addEventListener("login", checkToken);
    window.addEventListener("logout", checkToken);

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenAcc(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("login", checkToken);
      window.removeEventListener("logout", checkToken);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("logout"));
    setOpenAcc(false);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Hamburger Menu */}
      {openHam && (
        <div className="ham-menu z-50 bg-background absolute top-16 left-0 w-full flex flex-col items-center gap-4 py-4 shadow-md transition-all duration-300 md:hidden border-t border-gray-200">
          <Link to="/" className="hover:text-accent transition duration-300 text-secondary font-medium">Home</Link>
          <Link to="/shop" className="hover:text-accent transition duration-300 text-secondary font-medium">Shop</Link>

          <Link to="/about" className="hover:text-accent transition duration-300 text-secondary font-medium">About</Link>
          <Link to="/wishlist" className="hover:text-accent transition duration-300 text-secondary font-medium">Wishlist</Link>
          <Link to="/cart" className="hover:text-accent transition duration-300 text-secondary font-medium">My Cart</Link>
        </div>
      )}

      {/* Navbar */}
      <div className="nav flex items-center justify-between h-16 px-6 relative bg-white shadow-sm border-b border-gray-100 z-40">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl font-serif text-primary">BookStore</Link>

        {/* Hamburger (mobile) */}
        <button onClick={() => setOpenHam(!openHam)} className="md:hidden text-primary">
          <GiHamburgerMenu className="text-2xl" />
        </button>

        {/* Middle menu (desktop) */}
        <div className="hidden md:flex justify-center items-center gap-10">
          <Link to="/" className="hover:text-accent transition duration-300 text-secondary font-medium font-sans">Home</Link>
          <Link to="/shop" className="hover:text-accent transition duration-300 text-secondary font-medium font-sans">Shop</Link>

          <Link to="/about" className="hover:text-accent transition duration-300 text-secondary font-medium font-sans">About</Link>
          <Link to="/wishlist" className="hover:text-accent transition duration-300 text-secondary font-medium font-sans">Wishlist</Link>
          <Link to="/cart" className="hover:text-accent transition duration-300 text-secondary font-medium font-sans">My Cart</Link>
        </div>



        {/* User icon / avatar + dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setOpenAcc(!openAcc)} className="focus:outline-none">
            {userInitial ? (
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold cursor-pointer shadow-md hover:bg-slate-800 transition">
                {userInitial}
              </div>
            ) : (
              <FaUserCircle className="text-3xl cursor-pointer text-secondary hover:text-primary transition" />
            )}
          </button>

          {openAcc && (
            <div className="absolute right-0 top-12 bg-white shadow-xl rounded-xl flex flex-col w-48 py-2 border border-gray-100 animate-scaleIn z-50 overflow-hidden">
              {userInitial ? (
                <>
                  <div className="px-4 py-2 border-b border-gray-100 text-sm text-gray-500 mb-1">Account</div>
                  <Link to="/profile" className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 transition font-medium">My Profile</Link>
                  <Link to="/cart" className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 transition font-medium">My Orders</Link>
                  <Link to="/wishlist" className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 transition font-medium">Wishlist</Link>

                  <div className="border-t border-gray-100 my-1"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition font-medium">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/signup" className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 transition font-medium">Sign Up</Link>
                  <Link to="/login" className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 transition font-medium">Login</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default NavBar;
