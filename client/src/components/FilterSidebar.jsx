import React from "react";

const FilterSidebar = ({ setCategory }) => {


  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    setCategories((prevCategories) =>
      checked
        ? [...prevCategories, value] // Add the selected category
        : prevCategories.filter((category) => category !== value) // Remove unselected category
    );
  };

  return (
    <div className="p-4 border-r border-gray-200">
      <h2 className="font-bold mb-4">Filter Products</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Category</h3>
        <ul>
          <li><input type="checkbox" value='mobile' id="mobile" onChange={(e) => setCategory(e.target.checked ? e.target.value : 'All')} /> <label htmlFor="mobile">Mobile</label></li>
          <li><input type="checkbox" value='watch' id="watch" onChange={(e) => setCategory(e.target.checked ? e.target.value : 'All')} /> <label htmlFor="watch">Watch</label></li>
          <li><input type="checkbox" value='laptop' id="laptop" onChange={(e) => setCategory(e.target.checked ? e.target.value : 'All')} /> <label htmlFor="laptop">Laptop</label></li>
          <li><input type="checkbox" value='computer' id="computer" onChange={(e) => setCategory(e.target.checked ? e.target.value : 'All')} /> <label htmlFor="computer">Computer</label></li>
          <li><input type="checkbox" value='accessories' id="accessories" onChange={(e) => setCategory(e.target.checked ? e.target.value : 'All')} /> <label htmlFor="accessories">Accessories</label></li>
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <input type="range" min="0" max="500000" className="w-full" />
      </div>
      
    </div>
  );


}


export default FilterSidebar;
