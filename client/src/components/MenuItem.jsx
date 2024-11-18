import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import ProductItem from './ProductItem'

const MenuItem = ({category}) => {

  const {products} = useContext(StoreContext)

  return (
    <div className=''>
    
    {products.length==0?
    <div className="border-gray-300 h-20 w-20 m-auto my-6 animate-spin rounded-full border-8 border-t-primary" />
    :
    <div className="flex justify-center items-center flex-wrap w-[100%] gap-6 p-6">
      
      {products.map((item, index)=>{
        if(category === "All" || category === item.category){
 
          // id, colors, company, price, name, image, description, category, featured 

          return (
            <div key={index}>
              {console.log(item)}
              <ProductItem item={item} />
            </div>
          )
        }
      })}
    </div>}
  </div>
  )
}

export default MenuItem