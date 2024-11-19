import React, { useContext, useEffect, useState } from 'react'
import FilterSidebar from '../../components/FilterSidebar'
import MenuItem from '../../components/MenuItem'
import { useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Shop = () => {

  const {category, setCategory} = useContext(StoreContext)
  const location = useLocation();

  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const item = queryParams.get('item'); // Retrieves the value of 'item'

  useEffect(() => {
    
    item ? setCategory(item) : setCategory('All')

  }, [])
  

  return (
    <div className="min-h-screen ">
      <div className="flex bg-gray-100">
        <div className='w-[15%] hidden md:block'>
        <FilterSidebar setCategory={setCategory} />
        </div>
        <div className='w-[85%] mb-10'>
        <MenuItem category={category}/>
        </div>
      </div>
    </div>
  )
}

export default Shop