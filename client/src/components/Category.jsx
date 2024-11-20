import React from 'react'
import { categories } from '../assets/assets'
import '../index.css'

const Category = ({category, setCategory}) => {
  return (
    <div>
      <div className='px-8 gap-3 flex flex-col'>
        <h2 className='text-4xl mt-4 font-bold font-sans'> Explore Category </h2>
        <p className='text-xl font-sans'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere molestias ad laboriosam repellendus quos hic!</p>
        <div className='flex justify-between items-center cursor-pointer gap-6 overflow-x-scroll no-scrollbar '>
        {categories.map((item, index)=>{
          return (
            <div onClick={()=>setCategory(prev => prev === item.category_name ? "All" : item.category_name)} key={index} className='flex flex-col gap-2 items-center '>
              <img src={item.category_image} className={`w-[15vw] md:w-[12vw] min-w-[100px] ${category === item.category_name ? "border-4 border-solid border-primary rounded-[150%]" : "rounded-[150%]"} `} alt="" />
              <p className='text-lg '>{item.category_name}</p>
            </div>
        )
        })}
        </div>
        <hr className='h-[2px] bg-gray-600 mt-4' />
      </div>
    </div>
  )
}

export default Category