import React from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Navbar from '../Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <div>
      <ToastContainer />
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Layout