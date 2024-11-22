import React from 'react'
import { categories } from '../assets/assets'
import '../index.css'

const Category = ({category, setCategory}) => {
  return (
    <div>
      <div className='px-8 gap-3 flex flex-col'>
        <h2 className='text-4xl mt-4 font-bold font-sans'> Discover Electronics </h2>
        <p className='text-xl font-sans'>Discover top electronics for every need – shop now effortlessly!</p>
        <div className='flex justify-evenly items-center cursor-pointer gap-6 overflow-x-scroll no-scrollbar '>
        {categories.map((item, index)=>{
          return (
            <div onClick={()=>setCategory(prev => prev === item.name.toLowerCase() ? "All" : item.name.toLowerCase())} key={index} className='flex flex-col gap-2 items-center '>
              <div className={`flex justify-center p-5 text-center ${category === item.name.toLowerCase() ? "border-4 border-solid border-primary rounded-[150%]" : " border-1 border-solid border-primary rounded-[150%]"} `}>
                <p className='text-4xl'>{<item.icon />} </p>
              </div>
              {/* <img src=  alt="" /> */}
              <p className='text-lg '>{item.name}</p>
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