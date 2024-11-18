import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("All")
  const [productShow, setProductShow] = useState()
  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState("")
  const [payment, setPayment] = useState(null)

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/product/list')
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
    // if (token) {
    //   await axios.post(URL + "/api/cart/add", { itemId }, { headers: { token } })
    //   console.log("success")
    // }
  }
  const removeToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    // if (token) {
    //   await axios.post(URL + "/api/cart/remove", { itemId }, { headers: { token } })
    //   console.log("success")
    // }
  }

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

  useEffect(() => {

    fetchProducts()

  }, [])



  const contextValue = {
    products, setProducts, fetchProducts,
    cartItems, setCartItems, payment, setPayment,
    token, setToken, addToCart, removeToCart, getTotalCartAmount,
    productShow, setProductShow, category, setCategory
  }

  return (
    <StoreContext.Provider value={contextValue} >
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider