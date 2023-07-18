import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const Food = () => {
  const { id } = useParams();
  const [{ foodItems }] = useStateValue();
const foodItem = foodItems ? foodItems.find((item) => item.id === id) : null;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {foodItem ? (
        <div className="flex items-center">
          <img
            src={foodItem.imageURL}
            alt={foodItem.name}
            className="w-80 h-80 object-fit"
          />
          <div className="ml-8">
            <h1 className="text-4xl font-semibold text-gray-800">
              {foodItem.title}
            </h1>
            <p className="text-xl mt-2 text-gray-600">💶 : {foodItem.price} </p>
            <p className="text-xl mt-2 text-gray-600">
             🔥: {foodItem.calories} 
            </p>
            <h2 className="text-center text-3xl mt-4 px-8 black">🥦 Ingredients 🥦: </h2>
            <p className="text-center text-lg mt-4 px-4 text-gray-700">
              {foodItem.ingredients}
            </p>
          </div>
          
        </div>
      ) : (
        <p>Food item not found</p>
      )}
    </div>
  );
};

export default Food;
