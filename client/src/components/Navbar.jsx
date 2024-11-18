import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiAccountCircleFill } from "react-icons/ri";
import { MdOutlineFavorite } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-secondary text-primary font-sans">
      {/* Top Notification Bar */}
      <div className="flex justify-between bg-primary text-white items-center p-2 px-8 text-sm">
        <div className="flex space-x-4">
          <p className='text-center'>Tell a friend about Electhub Electronics & get 30% off your next order.</p>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-300">Offer Zone</a>
          <a href="#" className="hover:text-gray-300">Gift Cards</a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex bg-[#FEFEFE] justify-between items-center px-6 py-3">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-primary text-2xl focus:outline-none lg:hidden"
        >
          ☰
        </button>

        {/* <div className="text-2xl font-bold">GADGET GARAGE</div> */}
        <Link to='/'><img src='/gadget.png' alt='logo' width={200} height={200} /></Link>


        {/* Search Bar for Larger Screens */}
        <div className="hidden lg:flex mx-4 lg:w-[500px] border-2 border-solid border-primary rounded-lg">
          <input
            type="text"
            placeholder="Search products here..."
            className="w-full p-2 rounded-l-lg focus:outline-none text-black"
          />
          <button className="bg-yellow-400 p-2 rounded-r-lg hover:bg-yellow-500">
            🔍
          </button>
        </div>

        {/* User Icons */}
        <div className="flex space-x-4 items-center">
          <Link to="/login" className="flex text-xl font-bold items-center gap-2 text-gray-600 hover:text-primary"><span className='hidden md:block '>Account</span> <RiAccountCircleFill /></Link>
          <Link to="#" className="flex text-xl font-bold text-gray-600 items-center gap-2 hover:text-primary"><span className='hidden md:block '>Wishlist</span> <MdOutlineFavorite /></Link>
          <Link to="/cart" className="flex text-xl font-bold text-gray-600 items-center gap-2 hover:text-primary"><span className='hidden md:block '>Cart</span> <FaCartShopping /></Link>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-50 lg:hidden`}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl absolute top-4 right-4 focus:outline-none"
        >
          ×
        </button>

        {/* Sidebar Links */}
        <div className="flex flex-col p-6 space-y-4 mt-12">
          <select className="bg-primary text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">All Categories</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="accessories">Accessories</option>
            <option value="watch">Watch</option>
          </select>

          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/shop?item=watch" className="hover:text-gray-300">Smart Watches</Link>
          <Link to="/shop" className="text-yellow-400 hover:text-yellow-300">New Arrivals</Link>
          <Link to="#" className="hover:text-gray-300">About Us</Link>
          <Link to="#" className="hover:text-gray-300">All Brands</Link>
          <Link to="#" className="hover:text-gray-300">Blog</Link>
        </div>
      </div>

      <div className="bg-white text-primary border-2 border-solid border-gray-200 hidden lg:block text-sm py-2">
        <div className="flex items-center justify-center space-x-8">
          <select className="bg-primary text-white hover:bg-primary py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">All Categories</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="accessories">Accessories</option>
            <option value="watch">Watch</option>
          </select>

          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/shop?item=watch" className="hover:text-gray-300">Smart Watches</Link>
          <Link to="/shop" className="text-yellow-600 hover:text-blue-300">New Arrivals</Link>
          <Link to="#" className="hover:text-gray-300">About Us</Link>
          <Link to="#" className="hover:text-gray-300">All Brands</Link>
          <Link to="#" className="hover:text-gray-300">Blog</Link>
        </div>
      </div>


      {/* Search Bar for Mobile */}
      <div className='lg:hidden items-center flex w-full justify-center my-2'>
        <div className="flex items-center w-[80%] border-2 border-solid border-primary rounded-lg">
          <input
            type="text"
            placeholder="Search products here..."
            className="w-full p-2 rounded-l-lg focus:outline-none text-black"
          />
          <button className="bg-yellow-400 p-2 rounded-r-lg hover:bg-yellow-500">
            🔍
          </button>
        </div>
      </div>

      {/* Overlay to Close Sidebar */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
        ></div>
      )}
    </div>
  );
};

export default Navbar;
