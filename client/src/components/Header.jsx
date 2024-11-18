import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const slides = [
  {
    title: "Discover Smartphones & Accessories",
    description: "Browse our store to find new collections of smartphones, laptops, and other electronics at the best prices.",
    buttonText: "Shop Now",
    image: 'https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-118763.jpg?t=st=1731941681~exp=1731945281~hmac=4e38a21cf000c49a71b9e498901c296d7ede59517b9c2cf7fad912fa4d3ea636&w=1380', // replace with actual image path
  },
  {
    title: "Latest Gadgets Available",
    description: "Find the latest gadgets and accessories to stay updated with tech trends.",
    buttonText: "Explore",
    image: 'https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-126800.jpg?t=st=1731941709~exp=1731945309~hmac=fc05f896460bf399438d2ee2e4fe832b50ca4b0be8bb9e07d2e5857a5d11a487&w=1380', // replace with actual image path
  },
  {
    title: "Exclusive Deals on Electronics",
    description: "Get the best prices on top-quality electronics and accessories.",
    buttonText: "Grab Offer",
    image: 'https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-119090.jpg?t=st=1731941772~exp=1731945372~hmac=747c836946d8480808ebe4d406a516fba03dc8a5bc84b989937d7dfab1f9383a&w=1380', // replace with actual image path
  }
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 3 seconds
    // return () => clearInterval(interval);
  }, []);

  return (
    <header
  className="bg-cover bg-center bg-no-repeat rounded-xl my-8 mx-5 h-[60vh] flex justify-center items-center"
  style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
>
  <div className="container mx-auto px-6 flex flex-col  items-center text-center">
    <div className="w-full md:w-1/2">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {slides[currentIndex].title}
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        {slides[currentIndex].description}
      </p>
      <button className="bg-primary text-white py-2 px-6 rounded-md shadow-lg hover:bg-primary transition">
        {slides[currentIndex].buttonText}
      </button>
    </div>
  </div>
</header>

  );
};

export default Header;
