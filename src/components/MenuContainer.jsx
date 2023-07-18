import React, { useState } from "react";

import { categories } from "../utils/data";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import RowContainer from "./RowContainer";

const MenuContainer = () => {
  const [filter, setFilter] = useState("All");

  const [{ foodItems }, dispatch] = useStateValue();

  const allCategories = [{id: 0, name: 'All', urlParamName: 'All'}, ...categories];

  const renderIcon = (category) => {
    switch (category.name) {
      case "All":
        return <>🍽️</>;
      case "Salads":
        return <>🥗</>;
      case "Burgers":
        return <>🍔</>;
      case "Pizza":
        return <>🍕</>;
      case "Icecream":
        return <>🍦</>;
      case "Drinks":
        return <>🥤</>;
      default:
        return null;
    }
  };

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-3xl font-semibold italic capitalize relative before:absolute before:rounded-lg before:content before:w-full before:h-1 before:-bottom-2 before:left-0 animate-color-change">
          Right Or Left Food Is The Best
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 ">
          {allCategories &&
            allCategories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                } w-28 min-w-[94px] h-32 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-12 h-12 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-yellow-500"
                      : "bg-cartNumBg"
                  } group-hover:bg-yellow-500 flex items-center justify-center`}
                >
                  <span className="text-3xl">{renderIcon(category)}</span>
                </div>
                <p
                  className={`text-md ${
                    filter === category.urlParamName
                      ? "text-ywllow-500"
                      : "text-textColor"
                  } group-hover:text-yellow-500`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={
              filter === "All"
                ? foodItems
                : foodItems?.filter((n) => n.category == filter)
            }
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
