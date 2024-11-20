import React, { useContext, useState } from 'react'
import Header from '../../components/Header'
import Category from '../../components/Category'
import ProductSlider from '../../components/ProductSlider'
import MenuItem from '../../components/MenuItem'
import TestimonialSlider from '../../components/Testimonial'
import { StoreContext } from '../../context/StoreContext'

const Home = () => {

  const {category, setCategory} = useContext(StoreContext)


  return (
    <div>
      <Header />
      <ProductSlider />
      <Category category={category} setCategory={setCategory} />
      <div>
        <h2 className='text-3xl text-center font-sans font-bold my-[2rem]'>Top Products For Our Shop</h2>
        <MenuItem category={category} />
      </div>
      <TestimonialSlider />
    </div>
  )
}

export default Home