import React, { useState, useEffect } from "react";

const testimonials = [
  {
    content: `My order was delivered today. It was neatly packed and individually wrapped with bubble wrap to ensure that no items were damaged. I loved the service and I would totally order again. Plus I got free stuff too!`,
    author: "S Jami",
  },
  {
    content: `Great customer service! The delivery was super fast, and everything was packed with care. I'll definitely recommend it to my friends.`,
    author: "A Patel",
  },
  {
    content: `The quality exceeded my expectations! I love how they included a little gift with my order. Can't wait to shop again!`,
    author: "R Thompson",
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change slide every 3 seconds (only for small screens)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="font-bold text-center text-4xl text-gray-700 my-5">Testimonials</h2>
      {/* Mobile View: Slider */}
      <div className="block md:hidden">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
          <div className="flex items-center space-x-1 mb-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.222 3.745a1 1 0 00.95.69h3.927c.967 0 1.371 1.24.588 1.81l-3.18 2.307a1 1 0 00-.364 1.118l1.222 3.745c.3.922-.755 1.688-1.539 1.118L10 13.347l-3.18 2.307c-.784.57-1.838-.196-1.539-1.118l1.222-3.745a1 1 0 00-.364-1.118L3.96 8.172c-.783-.57-.379-1.81.588-1.81h3.927a1 1 0 00.95-.69l1.222-3.745z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-700 mb-4">{testimonials[currentIndex].content}</p>
          <p className="text-gray-700 font-bold">- {testimonials[currentIndex].author}</p>
        </div>

        {/* Pagination Dots */}
        <div className="flex space-x-2 mt-6 justify-center">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Desktop View: Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out"
          >
            <div className="flex items-center space-x-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.222 3.745a1 1 0 00.95.69h3.927c.967 0 1.371 1.24.588 1.81l-3.18 2.307a1 1 0 00-.364 1.118l1.222 3.745c.3.922-.755 1.688-1.539 1.118L10 13.347l-3.18 2.307c-.784.57-1.838-.196-1.539-1.118l1.222-3.745a1 1 0 00-.364-1.118L3.96 8.172c-.783-.57-.379-1.81.588-1.81h3.927a1 1 0 00.95-.69l1.222-3.745z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-4">{testimonial.content}</p>
            <p className="text-gray-700 font-bold">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
