import React from "react";

const FilterSidebar = ({setCategory}) => {


  return(
    <div className="p-4 border-r border-gray-200">
      <h2 className="font-bold mb-4">Filter Products</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Category</h3>
        <ul>
          <li><input type="checkbox" id="men-fashion" /> <label htmlFor="men-fashion">Men Fashion</label></li>
          <li><input type="checkbox" id="women-fashion" /> <label htmlFor="women-fashion">Women Fashion</label></li>
          <li><input type="checkbox" id="accessories" /> <label htmlFor="accessories">Accessories</label></li>
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <input type="range" min="0" max="500" className="w-full" />
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Color</h3>
        <div className="flex space-x-2">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <div className="w-6 h-6 bg-primary rounded-full"></div>
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
  

}


export default FilterSidebar;
