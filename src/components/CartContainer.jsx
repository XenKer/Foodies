import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [maximized, setMaximized] = useState(false);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [cartItems]); // Update the dependency array to only include cartItems

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  const toggleMaximize = () => {
    setMaximized(!maximized);
  };


  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={`fixed top-0 right-0 ${
        maximized ? "w-screen h-[98vh]" : "w-[30vw] h-[95vh]"
      } bg-white drop-shadow-md flex flex-col z-[101] cart-container`}
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
      <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
        <span className="text-textColor text-3xl">🟡</span>
      </motion.div>
      <p className="text-textColor text-4xl font-semibold">Cart</p>

      <motion.p
        whileTap={{ scale: 0.75 }}
        className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
        onClick={clearCart}
      >
        Clear your cart <RiRefreshFill />
      </motion.p>

        <button className="maximize-button text-4xl" onClick={toggleMaximize}>
          {maximized ? "-" : "+"}
        </button>
      </div>

      <div className="flex flex-col h-full overflow-auto">
        {/* cart Items section */}
        <div className="flex-1 px-6 py-10 flex flex-col gap-3">
          {/* cart Item */}
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                setFlag={setFlag}
                flag={flag}
              />
            ))}
        </div>

        {/* cart total section */}
        <div className="bg-cartTotal px-8 py-2">
          <div className="border-b border-black my-2"></div>

          <div className="flex items-center justify-between">
            <p className="text-black text-xl font-semibold">Total</p>
            <p className="text-black text-xl font-semibold">💶{tot}</p>
          </div>

          {user ? (
            <>
              {cartItems && cartItems.length > 0 ? (
                <Link to="/checkout">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    type="button"
                    className="w-full p-2 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 text-black-50 text-lg my-2 hover:shadow-lg"
                  >
                    Check Out
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  disabled
                  className="w-full p-2 rounded-full bg-gray-400 text-gray-50 text-lg my-2 cursor-not-allowed"
                >
                  Check Out
                </motion.button>
              )}
            </>
          ) : (
            <>
              {cartItems && cartItems.length > 0 ? (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  className="w-full p-2 rounded-full bg-gradient-to-tr from-black to-black text-gray-50 text-xl my-2 hover:shadow-lg"
                >
                  Login to check out
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  disabled
                  className="w-full p-2 rounded-full bg-gray-400 text-gray-50 text-xl my-2 cursor-not-allowed"
                >
                  Login to check out
                </motion.button>
              )}
            </>
          )}
        </div>
      </div>

      {cartItems && cartItems.length === 0 && (
        <div className="flex flex-col items-center justify-center mb-3">
          <p className="text-xl text-textColor font-semibold">
            Cart is empty, add some food to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
