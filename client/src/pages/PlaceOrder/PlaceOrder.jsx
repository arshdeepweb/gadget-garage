import React, { useContext, useEffect, useState, useCallback } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DELIVERY_CHARGE = 500; // Define reusable constants

const PlaceOrder = () => {
  const { 
    getTotalCartAmount, 
    products, 
    URL, 
    cartItems, 
    token, 
    setToken,
    payment, 
    setPayment, 
    setCartItems,
    coupon,
    setCoupon,
    getTotalDiscountAmount
     
  } = useContext(StoreContext);

  let discountTotal = getTotalDiscountAmount()
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    password:"",
    street: "",
    state: "",
    city: "",
    country: "",
    email: "",
    phoneNumber: "",
    zipCode: "",
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Prepare Razorpay options
  const createRazorpayOptions = (order, token) => ({
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Product Payment",
    description: "Product Payment",
    order_id: order.id,
    handler: async (response) => {
      try {
        const { data } = await axios.post(`${URL}/api/order/verify-razor`, response, { headers: { token } });
        if (data.success) {
          setCartItems({}); // Clear the cart
          navigate("/myorders");
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
      }
    },
  });

  // Process payment with Razorpay
  const processPayment = async (order) => {
    const options = createRazorpayOptions(order);
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Handle the order placement
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      const orderItems = products
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({ ...item, quantity: cartItems[item._id] }));

      const orderData = {
        address: data,
        items: orderItems,
        amount: discountTotal + DELIVERY_CHARGE,
        payment,
      };

      const response = await axios.post(`${URL}/api/order/place`, orderData, );
      console.log(response);
      if (response.data.success) {
        localStorage.setItem('token',response.data.message)
        setToken(response.data.message)
        processPayment(response.data.order, response.data.message);
        navigate('/myorders')
      } else {
        console.error("Order creation failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during order placement:", error);
    }
  };

  // Redirect if no token or cart is empty
  useEffect(() => {
    if (getTotalCartAmount() <= 0) {
      toast.info('purchase a product')
        navigate('/shop')
      
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <div className="place-order-container flex flex-col md:flex-row justify-between mx-4 my-[3rem]">
      {/* Delivery Information Form */}
      <form 
        onSubmit={handlePlaceOrder} 
        className="delivery-form flex flex-col gap-6 px-6 flex-1"
      >
        <h2 className="text-4xl font-bold">Delivery Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={data.firstName}
            onChange={handleChange}
            className="p-4 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            value={data.lastName}
            onChange={handleChange}
            className="p-4 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
          />
        </div>
        <input
            type="text"
            name="password"
            placeholder="Password"
            required
            value={data.password}
            onChange={handleChange}
            className="p-4 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
          />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={data.email}
          onChange={handleChange}
          className="p-4 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          required
          value={data.street}
          onChange={handleChange}
          className="p-4 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            value={data.city}
            onChange={handleChange}
            className="p-4 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            required
            value={data.state}
            onChange={handleChange}
            className="p-4 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            required
            value={data.zipCode}
            onChange={handleChange}
            className="p-4 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            required
            value={data.country}
            onChange={handleChange}
            className="p-4 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
          />
        </div>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          required
          value={data.phoneNumber}
          onChange={handleChange}
          className="p-4 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
        />
      </form>

      {/* Cart Totals and Payment */}
      <div className="cart-totals mt-5 md:mt-1 flex-1 flex flex-col px-6">
        <h2 className="text-2xl font-bold">Cart Totals</h2>
        <div className="totals-summary my-4">
          <div className="flex justify-between">
            <p>SubTotal</p>
            <p>Rs {getTotalCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery</p>
            <p>Rs {DELIVERY_CHARGE}</p>
          </div>
          {coupon ? <div className="flex justify-between">
                <b className="text-lg">Discount</b>
                {coupon ? (
                  <b>{coupon === "gadget20" 
                    ? `${coupon} ` 
                    : coupon === "newyear30" 
                    ? `${coupon} ` 
                    : ""} </b>
                ) : ""}
              </div> : <></>}
          <div className="flex justify-between">
            <b>Total</b>
            <b>Rs {discountTotal + DELIVERY_CHARGE}</b>
          </div>
        </div>
        <button
          type="submit"
          onClick={handlePlaceOrder}
          className="p-2 my-2 cursor-pointer border-2 border-solid border-primary bg-primary text-white w-[100%] text-lg rounded-md"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
