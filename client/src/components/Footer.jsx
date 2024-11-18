import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-gray-100 py-10 bg-primary">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        
        {/* About Information */}
        <div>
          <h4 className="font-semibold text-xl mb-4">About Information</h4>
          <p className="text-sm mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.
          </p>
        </div>
        
        {/* Products */}
        <div>
          <h4 className="font-semibold text-xl mb-4">Products</h4>
          <ul className="text-sm space-y-2 flex flex-col">
            <NavLink to='#' className="hover:underline"> Prices Drop</NavLink>
            <NavLink to="#" className="hover:underline">New Products</NavLink>
            <NavLink to="#" className="hover:underline">Best Sales</NavLink>
            <NavLink to="#" className="hover:underline">Contact Us</NavLink>
            <NavLink to="#" className="hover:underline">Sitemap</NavLink>
          </ul>
        </div>
        
        {/* Our Company */}
        <div>
          <h4 className="font-semibold text-xl mb-4">Our Company</h4>
          <ul className="text-sm space-y-2 flex flex-col">
            <NavLink to="#" className="hover:underline">Delivery</NavLink>
            <NavLink to="#" className="hover:underline">Legal Notice</NavLink>
            <NavLink to="#" className="hover:underline">Terms And Conditions</NavLink>
            <NavLink to="#" className="hover:underline">About Us</NavLink>
            <NavLink to="#" className="hover:underline">Secure Payment</NavLink>
          </ul>
        </div>
        
        {/* Store Information */}
        <div>
          <h4 className="font-semibold text-xl mb-4">Store Information</h4>
          <ul className="text-sm space-y-2">
            <li><span className="font-semibold">Gadget Garage - Electronics Store</span></li>
            <li>Amritsar</li>
            <li>India</li>
            <li>📞 (+91) 8556864699</li>
            <li>✉️ info@gadgetgarage.com</li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
