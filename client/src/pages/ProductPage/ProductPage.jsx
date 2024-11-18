import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const { products, productShow, cartItems, addToCart, removeToCart, } = useContext(StoreContext)

  return (
    <div className="py-10 ">
      {products.map((item, index) => {
        if (productShow === item.id) {
          return (
            <div key={index} className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-8">
              {/* Product Image Section */}
              <div className="flex-1">
                <img
                  src={item.image} // Replace with the product image URL
                  alt="Stan Smith Mid High Top, Horween Leather"
                  className="rounded-lg shadow-lg"
                />

              </div>

              {/* Product Info Section */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">
                  {item.name}
                </h1>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>

                <div className="text-xl font-semibold text-green-600 mb-4">
                  {item.price}
                </div>

                <div className="mb-4">
                  <span className="text-yellow-500">★★★★☆</span>
                </div>

              

                {/* Quantity Selector */}
                {cartItems[item.id] > 0 ? <div className="mt-4 flex items-center space-x-4 my-5">
                  <button className="w-8 h-8 rounded-full bg-gray-800 text-white hover:bg-gray-900" onClick={() => { removeToCart(item.id) }}>
                    -
                  </button>
                  <span className="text-gray-700 font-medium">{cartItems[item.id]}</span>
                  <button className="w-8 h-8 rounded-full bg-gray-800 text-white hover:bg-gray-900" onClick={() => { addToCart(item.id) }}>
                    +
                  </button>
                </div> : <></>}

                {/* Add to Cart Button */}
                <button
                  className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full"
                  // disabled={!selectedSize}
                  onClick={() => addToCart(item.id)}
                >
                  Add to Cart
                </button>

                {/* Social Sharing */}
                <div className="mt-4 flex gap-4">
                  <button className="text-gray-700 underline hover:text-black">
                    Collect
                  </button>
                  <button className="text-gray-700 underline hover:text-black">
                    Share
                  </button>
                </div>
              </div>
            </div>
          )
        }
      })}
    </div>
  );
};

export default ProductPage;
