import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GiHamburgerMenu, GiBookshelf } from "react-icons/gi";
import { FaUserCircle, FaSearch, FaCartArrowDown, FaUsers } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { RxCross2, RxDashboard } from "react-icons/rx";
import { MdCategory } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";
import { FaTachometerAlt } from "react-icons/fa";

const AdminNavBar = ({ searchValue, setSearchValue }) => {
  const navigate = useNavigate(); // ✅ Correct position

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const toggleMobileSearch = () => {
    setMobileSearch(!mobileSearch);
    setOpen(false);
  };

  return (
    <div className="relative bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <h1 className="text-xl font-bold text-purple-700 flex items-center gap-2">
              <GiBookshelf /> Bookstore Admin
            </h1>
            <RxCross2
              className="text-2xl text-gray-500 cursor-pointer hover:text-purple-600"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Sidebar Links */}
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            {/* CORE */}
            <div
              className="mb-6 cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              <p className="text-gray-400 text-sm font-semibold mb-2">CORE</p>
              <div className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg">
                <RxDashboard className="text-xl text-purple-700" />
                <span className="text-gray-700 font-medium">Dashboard</span>
              </div>
            </div>

            {/* BOOKS MANAGEMENT */}
            <div className="mb-6">
              <p className="text-gray-400 text-sm font-semibold mb-2">
                BOOKS MANAGEMENT
              </p>

              <div
                className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg cursor-pointer"
                onClick={() => navigate("/admin/categories")}
              >
                <MdCategory className="text-xl text-purple-700" />
                <span className="text-gray-700 font-medium">Categories</span>
              </div>

              <div
                className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg cursor-pointer"
                onClick={() => navigate("/admin/authors")}
              >
                <FaPerson className="text-xl text-purple-700" />
                <span className="text-gray-700 font-medium">Authors</span>
              </div>

              <div
                className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg cursor-pointer"
                onClick={() => navigate("/admin/books")}
              >
                <IoBookSharp className="text-xl text-purple-700" />
                <span className="text-gray-700 font-medium">Books</span>
              </div>
            </div>

            {/* USERS MANAGEMENT */}
            <div className="mb-6">
              <p className="text-gray-400 text-sm font-semibold mb-2">
                USERS & OFFERS
              </p>

              <div
                className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg cursor-pointer"
                onClick={() => navigate("/admin/users")}
              >
                <FaUsers className="text-xl text-purple-700" />
                <span className="text-gray-700 font-medium">Users</span>
              </div>

              <div
                className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg cursor-pointer"
                onClick={() => navigate("/admin/offers")}
              >
                <FaTachometerAlt className="text-xl text-purple-700" />
                <span className="text-gray-700 font-medium">Offers</span>
              </div>
            </div>

            {/* ORDERS */}
            <div>
              <p className="text-gray-400 text-sm font-semibold mb-2">
                ORDER MANAGEMENT
              </p>

              <div
                className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg cursor-pointer"
                onClick={() => navigate("/admin/orders/total")}
              >
                <FaCartArrowDown className="text-xl text-purple-700" />
                <span className="text-gray-700 font-medium">Orders</span>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t text-sm text-gray-400">
            © 2025 Bookstore Admin
          </div>
        </div>
      </aside>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white shadow-sm flex justify-between items-center px-6 md:px-10 py-4">
        <div className="flex items-center gap-4">
          <GiHamburgerMenu
            className="text-2xl text-gray-700 cursor-pointer"
            onClick={() => setOpen(true)}
          />
          <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
            Bookstore Admin
          </h1>
        </div>

        {/* Desktop Search */}
        <div className="relative hidden md:block flex-1 max-w-lg mx-6">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by name or order no..."
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-300 outline-none text-gray-700"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="md:hidden" onClick={toggleMobileSearch}>
            <FaSearch className="text-xl text-gray-600 cursor-pointer" />
          </div>

          <FaUserCircle
            className="text-2xl text-gray-700 cursor-pointer hover:text-purple-600"
            onClick={() => setUser(!user)}
          />
        </div>
      </header>

      {/* Mobile Search */}
      {mobileSearch && (
        <div className="absolute top-0 left-0 w-full bg-white z-50 px-4 py-3 shadow flex items-center gap-3">
          <CiSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            className="w-full h-10 pl-2 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-300 outline-none"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <RxCross2
            className="text-xl cursor-pointer text-purple-400"
            onClick={toggleMobileSearch}
          />
        </div>
      )}

      {/* User Dropdown */}
      {user && (
        <div className="absolute top-16 right-6 bg-white shadow-lg rounded-lg z-50 flex flex-col gap-2 items-start p-3 border border-gray-100">
          <h1 className="cursor-pointer hover:text-purple-700 text-sm">
            Profile
          </h1>
          <h1 className="cursor-pointer hover:text-purple-700 text-sm">
            Logout
          </h1>
        </div>
      )}
    </div>
  );
};

export default AdminNavBar;
