import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../index.css'

function Cart() {
  const { cartItems, removeToCart, products, getTotalCartAmount, } = useContext(StoreContext);
  const navigate = useNavigate()

  let itemPrice = getTotalCartAmount()

  console.log(itemPrice);
  // flex justify-between items-center cursor-pointer gap-6 overflow-x-scroll no-scrollbar


  return (
    <div className="">
      <div className="my-[3.5rem]  ">
        <div className="overflow-x-scroll no-scrollbar">
          <div className="grid md:grid-cols-6 grid-cols-3 gap-4 justify-items-center items-center">
            <p className="text-xl font-bold ">Item Image</p>
            <p className="text-xl font-bold">Title</p>
            <p className="text-xl font-bold">Price</p>
            <p className="text-xl font-bold ">Quantity</p>
            <p className="text-xl font-bold">Total</p>
            <p className="text-xl font-bold">Remove</p>
          </div>
          <br />
          <hr className="h-[2px] bg-gray-600" />
          <div className="mb-[5rem]">
            {products.map((item, index) => {
              if (cartItems[item.id] > 0) {
                return (
                  <div key={index}>
                    <div className="grid md:grid-cols-6 grid-cols-3 gap-4 justify-items-center items-center my-3">
                      <img
                        src={item.image}
                        className="w-[85px] rounded-xl"
                        alt={item.name}
                      />
                      <p>{item.name}</p>
                      <p>Rs {item.price}</p>
                      <p className="">{cartItems[item.id]}</p>
                      <p className="">
                        Rs {item.price * cartItems[item.id]}
                      </p>
                      <p
                        onClick={() => {
                          removeToCart(item.id);
                        }}
                        className="w-[20px] cursor-pointer text-red-500 font-bold"
                      >
                        X
                      </p>
                    </div>
                    <hr className="h-[2px] bg-gray-600" />
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="flex justify-between max-gap md:flex-row flex-col mx-4">
          <div className="flex-1 flex justify-between gap-[20px] flex-col px-6">
            <h2 className="text-2xl font-bold">Cart Totals</h2>
            <div>
              <div className="flex justify-between">
                <p className="text-lg">SubTotal</p>
                {itemPrice > 0 ? (
                  <p>Rs {itemPrice}</p>
                ) : (
                  <span>Rs 0</span>
                )}
              </div>
              <div className="flex justify-between">
                <p className="text-lg">Delivery</p>
                {itemPrice > 0 ? (
                  <p>Rs {5}</p>
                ) : (
                  <span>Rs 0</span>
                )}
              </div>
              <div className="flex justify-between">
                <b className="text-lg">Total Amount</b>
                {itemPrice > 0 ? (
                  <b>Rs {itemPrice + 5}</b>
                ) : (
                  <span>Rs 0</span>
                )}
              </div>
            </div>
            <button className="p-2 my-2 cursor-pointer border-2 border-solid border-primary bg-primary text-white w-[100%] text-lg rounded-md" onClick={() => navigate("/placeorder")}>
              Proceed to Checkout
            </button>
          </div>
          <div className="flex flex-col gap-4 ">
            <p>If you have a promo code, Enter it</p>
            <div className="bg-gray-500 w-[20rem]">
              <input
                type="text"
                placeholder="Enter Promo Code"
                className="pl-[10px] bg-transparent border-none outline-none text-lg"
              />
              <button className="px-6 py-4 bg-black cursor-pointer text-white text-lg ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
