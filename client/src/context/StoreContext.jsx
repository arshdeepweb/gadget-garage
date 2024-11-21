import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  const URL = "https://gadget-garage.vercel.app"

  const [products, setProducts] = useState([])
  const [priceRange, setPriceRange] = useState(null)
  const [category, setCategory] = useState("All")
  const [productShow, setProductShow] = useState()
  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState("")
  const [payment, setPayment] = useState(null)

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${URL}/api/product/list`)
      console.log(res);
      if (res.data.success) {
        setProducts(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if (token) {
      await axios.post(URL + "/api/cart/add", { itemId }, { headers: { token } })
      console.log("success")
    }
  }
  const removeToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token) {
      await axios.post(URL + "/api/cart/remove", { itemId }, { headers: { token } })
      console.log("success")
    }
  }

  const loadCartData = async (token) => {
    const response = await axios.post(URL + "/api/cart/get", {}, { headers: { token } })
    setCartItems(response.data.message)
  }

  const paymentRazorpay = async (planId) => {
    console.log("RUN");
    try {
      const token = await getToken();
      const response = await axios.post(`${backendURL}/api/user/pay-razor`, { planId }, { headers: { token } });

      if (response.data.success) {
        initPay(response.data.order);
      } else {
        console.error("Payment initiation failed:", response.data.message);
      }
    } catch (error) {
      console.log("Error in paymentRazorpay:", error);
    }
  };

  const getTotalCartAmount = () => {
    console.log(cartItems);
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems.hasOwnProperty(item) && cartItems[item] > 0) {

        // Ensure item is treated as the same type as product._id
        let itemInfo = products.find(product => product.id == item);  // Use '==' for loose equality to compare different types

        if (itemInfo && typeof (itemInfo.price) !== 'undefined') {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.warn(`Item with _id ${item} not found in Products or has no price`, itemInfo);
        }
      }
    }
    return totalAmount;
  };


  async function loadData() {

    fetchProducts()
    let loginToken = localStorage.getItem("token")
    console.log(loginToken);
    if (loginToken) {
      setToken(loginToken)
      await loadCartData(loginToken)
    }
  }


  useEffect(() => {
    loadData()
  }, [])


  const contextValue = {
    products, setProducts, fetchProducts, URL,
    cartItems, setCartItems, payment, setPayment,
    token, setToken, addToCart, removeToCart, getTotalCartAmount,
    productShow, setProductShow, category, setCategory, priceRange, setPriceRange
  }

  return (
    <StoreContext.Provider value={contextValue} >
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider