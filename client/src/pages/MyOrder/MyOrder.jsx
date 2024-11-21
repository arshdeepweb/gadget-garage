import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { FaJediOrder } from "react-icons/fa";

const MyOrder = () => {

  const [data, setData] = useState([])
  const { URL, token } = useContext(StoreContext)
  const navigate = useNavigate()

  const fetchOrders = async () => {

    const url = URL + "/api/order/userorder"

    try {
      const response = await axios.post(url, {}, { headers: { token } })
      console.log(response.data.data)
      setData(response.data.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    } else if (!token) {
      navigate("/")
    }

  }, [token])



  return (

    <div>
      <div className='w-[80%] mx-auto'>
        <h1 className='text-3xl font-sans font-bold'>My Orders</h1>
        <div className=' my-6 '>
          {data.map((order, index) => {
            return (
              <div key={index} className='grid grid-cols-7 items-center my-4 px-2 py-4 border-solid border-primary border-2 rounded-md'>
               <span className='text-4xl'> <FaJediOrder /></span>
                {/* <img src={assets.parcel_icon} className='w-[80px]' alt="" /> */}
                <p>{order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ""
                  }
                })}</p>
                <br />
                <p>Rs {order.amount}</p>
                <p>Items : {order.items.length}</p>
                <p>{order.status}</p>
                <button className='px-1 py-3 border-solid border-primary border-2 rounded-md hover:bg-primary hover:text-white transition-all' onClick={fetchOrders}>Track Order</button>

              </div>
            )

          })}
        </div>
      </div>
    </div>
  )
}

export default MyOrder