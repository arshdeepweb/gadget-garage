import React, { useContext, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { StoreContext } from "../context/StoreContext";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products, setProductShow, setCategory, cartItems, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // Toggle Sidebar
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // Search Handler
  const handleSearch = useCallback(
    (e) => {
      const query = e.target.value;
      setSearchQuery(query);

      if (query.trim()) {
        setFilteredProducts(
          products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )
        );
      } else {
        setFilteredProducts([]);
      }
    },
    [products]
  );

  const onChangeHandler = (e) => {
    setCategory(e.target.value);
  }

  const totalItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);

  const logOut = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/')
  }

  // Product View Handler
  const productViewHandler = useCallback(
    (itemId) => {
      setSearchQuery("")
      setFilteredProducts([])
      setProductShow(itemId);
      navigate(`/product/${itemId}`);
    },
    [navigate, setProductShow]
  );

  // Reusable Search Result Component
  const SearchResult = ({ product }) => (
    <div
      onClick={() => productViewHandler(product.id)}
      className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-12 h-12 mr-4"
      />
      <div>
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-sm font-bold">{product.price}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-primary font-sans">
      {/* Top Notification Bar */}
      <div className="flex justify-between bg-primary text-white items-center p-2 px-8 text-sm">
        <p className="text-center">
          Tell a friend about Electhub Electronics & get 30% off your next order.
        </p>
      </div>

      {/* Main Navbar */}
      <div className="flex bg-[#FEFEFE] justify-between items-center px-6 py-3">
        <button
          onClick={toggleSidebar}
          className="text-primary text-2xl lg:hidden"
        >
          ☰
        </button>
        <Link to="/">
          <img src="/gadget.png" alt="logo" width={200} height={200} />
        </Link>

        {/* Search Bar */}
        <div className="relative hidden lg:flex mx-4 lg:w-[500px]">
          <input
            type="text"
            placeholder="Search products here..."
            className="w-full p-2 border-2 border-solid border-[#F2F0EA] rounded-lg focus:outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
          {filteredProducts.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg z-10">
              {filteredProducts.map((product) => (
                <SearchResult key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* User Icons */}
        <div className="flex space-x-4 lg:pr-5 items-center">


          {
            token ?
              <div className='flex flex-col group relative'>
                {/* <img src={assets.profile_icon} alt="" className='cursor-pointer' /> */}
                <div
                className="flex flex-col-reverse text-3xl font-bold items-center gap-1 text-primary"
              >
                <span className="hidden md:block text-sm">Profile</span>
                <RiAccountCircleFill />
              </div>

                <ul className='absolute z-50 mt-10 right-1 bg-[#fff0ed] border-2 border-solid hover:cursor-pointer border-secondary p-4 w-[10rem] rounded-md gap-3 child invisible group-hover:visible flex flex-col transition-all'>
                  <Link to='/myorders' className='flex gap-1'>
                    {/* <img src={assets.bag_icon} className='w-[25px]' alt="" /> */}
                    <p className='font-semibold hover:text-primary'> My Orders</p>
                  </Link>
                  <li onClick={logOut} className='flex gap-1 hover:cursor-pointer'>
                    {/* <img src={assets.logout_icon} alt="" className='w-[25px]'/> */}
                    <p className='font-semibold hover:text-primary'>Log Out</p>
                  </li>
                </ul>
              </div> : <Link
                to="/login"
                className="flex flex-col-reverse text-3xl font-bold items-center gap-1 text-primary"
              >
                <span className="hidden md:block text-sm">Account</span>
                <RiAccountCircleFill />
              </Link>
          }




          <Link
            to="/cart"
            className="relative flex flex-col-reverse text-3xl font-bold items-center gap-1 text-primary"
          >
            <span className="hidden md:block text-sm">Cart</span>
            <FaCartShopping />
            {/* Cart Item Count Badge */}
            <span className={`absolute ${totalItems === 0 ? 'hidden' : 'flex'} top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs`}>
              {totalItems}
            </span>
          </Link>
        </div>

      </div>

      <div className="bg-white text-primary border-2 border-solid border-gray-200 hidden lg:block text-sm py-2">
        <div className="flex items-center justify-center space-x-8">
          <select className="bg-primary text-white hover:bg-primary py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => onChangeHandler(e)}>
            <option value="All">All Categories</option>
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

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 lg:hidden`}
      >
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl absolute top-4 right-4 focus:outline-none"
        >
          ×
        </button>
        <div className="flex flex-col p-6 space-y-4 mt-12">
          <select className="bg-primary text-white py-2 px-4 rounded-md" onChange={(e) => onChangeHandler(e)}>
            <option value="All">All Categories</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="accessories">Accessories</option>
            <option value="watch">Watch</option>
          </select>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/shop?item=watch" className="hover:text-gray-300">
            Smart Watches
          </Link>
          <Link to="/shop" className="text-yellow-400 hover:text-yellow-300">
            New Arrivals
          </Link>
          <Link to="#" className="hover:text-gray-300">
            About Us
          </Link>
        </div>
      </div>

      {/* Overlay to Close Sidebar */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
        />
      )}
    </div>
  );
};

export default Navbar;
