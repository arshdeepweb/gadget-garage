import React from "react";
import { assets } from "../assets/assets";
import '../index.css'

const ProductSlider = () => {
  const products = [
    {
      title: "Smiley Man With Shot Virtual Glasses",
      price: "$99.00",
      image: "/vr.jpg", // Replace with the real image URL
      bgColor: "bg-primary",
    },
    {
      title: "MacBook Pro With Smart Phone",
      price: "$129.00",
      image: "/ph.jpg", // Replace with the real image URL
      bgColor: "bg-gray-100",
    },
  ];

  return (
    <div className="flex space-x-4 p-4 my-6 justify-start md:justify-center items-center gap-6 overflow-x-auto md:overflow-x-hidden no-scrollbar">
      {products.map((product, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${product.image})`,
          }}
          className="h-[30vh] md:h-[40vh] min-w-[80%] sm:min-w-[60%] md:min-w-[45%] relative cursor-pointer bg-cover bg-center flex items-center rounded-xl bg-no-repeat overflow-hidden group"
        >
          {/* Content */}
          <div className="flex flex-col px-8 sm:text-left w-[100%] gap-2 z-10 relative sm:w-[60%]">
            <h2 className="text-2xl md:text-3xl text-primary font-bold font-sans">
              {product.title}
            </h2>
            <p className="text-xl text-primary font-bold font-sans" >
              {product.price }
            </p>
            <button className="text-primary w-[8rem] border-2 border-primary hover:bg-primary hover:text-white border-solid bg-transparent rounded-2xl py-2 px-5">
              Shop Now
            </button>
          </div>
          {/* Overlay */}
          <div className="h-[30vh] md:h-[40vh] bg-black opacity-50 w-[100%] absolute top-0 rounded-xl"></div>
          {/* Background Hover Effect */}
          <div
            style={{
              backgroundImage: `url(${product.image})`,
            }}
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-110 rounded-xl"
          ></div>
        </div>
      ))}
    </div>



  );
};

export default ProductSlider;
