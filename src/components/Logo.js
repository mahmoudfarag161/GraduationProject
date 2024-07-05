import React from "react";
import logo from '../assest/logo.png';

const Logo = () => {
  return (
    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <img src={logo} alt="logo" className="w-40 h-30" />
            
          </a>
    
  );
};

export default Logo;
