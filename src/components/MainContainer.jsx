import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import Footer from "./Footer"; // Import the Footer component

const MainContainer = () => {
  const [{ foodItems, cartItems, cartShow }, dispatch] = useStateValue();
  useEffect(() => {}, [cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <MenuContainer />
      {cartShow && <CartContainer />}
      {/* <Search/> */}
      
      <Footer /> 
    </div>
  );
};

export default MainContainer;
