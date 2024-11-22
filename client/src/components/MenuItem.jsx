import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import ProductItem from './ProductItem';

const MenuItem = ({ category }) => {
  const { products, priceRange } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  console.log(category);

  // Filter products based on category
  const filteredProducts =
    category === 'All'
      ? products
      : products.filter((item) => item.category === category);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      {products.length === 0 ? (
        <div className="border-gray-300 h-20 w-20 m-auto my-6 animate-spin rounded-full border-8 border-t-primary" />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:flex justify-center items-center sm:flex-wrap w-[100%] gap-6 p-6">
            {currentProducts.map((item, index) => (
              <div key={index}>
                <ProductItem item={item} />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 mx-1 ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-black'
                } rounded`}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MenuItem;
