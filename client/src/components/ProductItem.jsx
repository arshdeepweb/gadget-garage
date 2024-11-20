import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ item }) => {

  const { id, colors, company, price, name, image, description, category, featured } = item;
  const { cartItems, addToCart, removeToCart, setProductShow } = useContext(StoreContext)
  const navigate = useNavigate()

  const productViewHandler = (itemid) => {
    setProductShow(itemid)
    navigate(`/product/${itemid}`)
  }

  return (


    <div className="bg-white w-[300px] border-2 border-solid border-gray-300 rounded-2xl shadow-md hover:shadow-lg transition-shadow relative">
      <div onClick={() => { productViewHandler(id) }} className='cursor-pointer'>
        {/* Wishlist Icon */}
        <div>
          {/* <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 hover:text-red-500 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button> */}

          {/* Product Image */}
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover rounded-lg mb-4 "
          />
        </div>
      </div>

      <div className='p-4'>
        {/* Product Details */}
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-1">Rs{price}</p>

        <div className='flex justify-between items-center'>
          <div className='flex justify-between items-center'>
            {/* Colors */}
            <div className="flex space-x-2 mt-2">
              {colors.map((color, index) => (
                <span
                  key={index}
                  className="w-6 h-6 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </div>



          {/* Quantity Selector */}
          {cartItems[id] > 0 ? <div className="mt-4 flex items-center space-x-4">
            <button className="w-8 h-8 rounded-full bg-gray-800 text-white hover:bg-gray-900" onClick={() => { removeToCart(id) }}>
              -
            </button>
            <span className="text-gray-700 font-medium">{cartItems[id]}</span>
            <button className="w-8 h-8 rounded-full bg-gray-800 text-white hover:bg-gray-900" onClick={() => { addToCart(id) }}>
              +
            </button>
          </div> : <></>}
        </div>

        {/* Add to Cart Button */}
        <button className="mt-6 w-full bg-primary text-white py-3 rounded-md hover:bg-primary transition-colors flex items-center justify-center" onClick={() => { addToCart(id) }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M16 16a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          Add to Cart
        </button>
      </div>

    </div>

  )
}

export default ProductItem