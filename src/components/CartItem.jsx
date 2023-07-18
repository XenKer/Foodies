import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { fetchCart } from "../utils/fetchLocalStorageData";
let items = [];

const CartItem = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  const updateCartCount = () => {
    const totalCount = cartItems.reduce((total, item) => total + item.qty, 0);
    dispatch({
      type: actionType.SET_CART_COUNT,
      cartCount: totalCount,
    });
  };

  const updateQty = (action, id) => {
    const updatedItems = [...cartItems];
    const itemIndex = updatedItems.findIndex((item) => item.id === id);
    const selectedItem = updatedItems[itemIndex];

    if (action === "add") {
      selectedItem.qty += 1;
    } else {
      selectedItem.qty -= 1;
      if (selectedItem.qty === 0) {
        updatedItems.splice(itemIndex, 1);
      }
    }

    items = updatedItems;
    setQty(selectedItem.qty);
    setFlag(flag + 1);
    cartDispatch();
    updateCartCount();
  };

  const removeItem = (id) => {
    items = cartItems.filter((item) => item.id !== id);
    setFlag(flag + 1);
    cartDispatch();
    updateCartCount();
  };

  useEffect(() => {
    items = cartItems;
  }, [qty, items]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item?.imageURL}
        className="w-20 h-20 rounded-full object-contain"
        alt=""
      />

      <div className="flex flex-col gap-2">
        <p className="text-3xl text-black">{item?.title}</p>
        <p className="text-2xl block text-black font-semibold">
        💶 {parseFloat(item?.price) * qty}
        </p>
        <p className="text-sm text-gray-500 mb">
          {qty} {qty === 1 ? `${item.title}` : `${item.title}`} in cart
        </p>
      </div>

      <div className="group flex items-center gap-3 ml- cursor-pointer">
        <button
          onClick={() => updateQty("add", item?.id)}
          className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
        >
          +
        </button>
        <button
          onClick={() => updateQty("remove", item?.id)}
          className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
        >
          -
        </button>

        <button
          onClick={() => removeItem(item?.id)}
          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
        >
          Remove
        </button>
        
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50 " />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50 " />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
