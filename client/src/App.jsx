import React, { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Shop from './pages/Shop/Shop'
import Home from './pages/Home/Home'
import StoreContextProvider from './context/StoreContext'
import Login from './pages/Login/Login'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import ProductPage from './pages/ProductPage/ProductPage'
import MyOrder from './pages/MyOrder/MyOrder'




{/* <Route path={signUp?"/signup":"/login"} element={<Login signUp={signUp} setSignUp={setSignUp} />} /> */ }

const App = () => {

  const [signUp, setSignUp] = useState(false)
  console.log(signUp);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/shop',
          element: <Shop />,
        },
        {
          path: "login",
          element: <Login signUp={signUp} setSignUp={setSignUp} />,
        },
        {
          path: "signup",
          element: <Login signUp={signUp} setSignUp={setSignUp} />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "placeorder",
          element: <PlaceOrder />,
        },
        {
          path: "product/:id",
          element: <ProductPage />,
        },
        {
          path: "myorders",
          element: <MyOrder />,
        }
      ]
    }
  ])

  return (
    <StoreContextProvider>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </StoreContextProvider>
  )
}

export default App