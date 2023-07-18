import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket, MdFastfood } from "react-icons/md";
import { motion } from "framer-motion";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full  flex items-center gap-3 my-12 scroll-smooth justify-center flex-wrap`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-full max-w-[350px] min-h-[250px] md:min-w-[350px] bg-white rounded-lg py-2 px-4 my-12 shadow-md hover:shadow-xl flex flex-col items-center justify-evenly relative"
          >
            <p className="text-gray-800 font-semibold text-base md:text-2xl">
              {item?.title}
            </p>
            <div className="w-full flex flex-wrap items-center justify-between">
              <Link to={`/food/${item.id}`}>
                <motion.div
                  className="w-40 h-45 drop-shadow-2xl"
                  whileHover={{ scale: 1.2 }}
                >
                  <img
                    src={item?.imageURL}
                    alt=""
                    className="w-full h-full object-contain rounded-lg shadow-md"
                    style={{objectFit: 'contain'}}
                  />
                </motion.div>
              </Link>
              <div className="flex flex-col items-end justify-end mr-14 ">
                <p className="text-xl text-gray-800 font-semibold">🔥: 
                  {item?.calories}
                </p>
                <div className="flex items-center gap-6">
                  <p className="text-lg text-gray-800 font-semibold">
                    <span className="text-xl text-black">💶: </span> {item?.price}
                  </p>
                </div>
              </div>
              <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer hover:shadow-lg absolute top-0 right-0 mt-2 mr-2"
              onClick={() => {
                // if no item is  in the cart, add it as a new item with its default price
                const newItem = { ...item, quantity: 1 };

                dispatch({
                  type: actionType.SET_CARTITEMS,
                  cartItems: [...cartItems, newItem],
                });
              }}
            >
              <MdShoppingBasket className="text-2xl text-black hover:text-yellow-500" />
            </motion.div>

            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-xl text-gray-800 font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
