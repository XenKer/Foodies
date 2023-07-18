import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";

const Payment = ({ tot }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [{ cartItems, user }] = useStateValue();

  useEffect(() => {
    if (showModal) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [showModal]);

  const storeOrderInFirebase = async (orderDetails) => {
  try {
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      await addDoc(collection(firestore, "orders"), {
        userId: userId,
        orderDate: new Date().toISOString(), 
        ...orderDetails,
      });

      console.log("Order stored successfully!");
    } else {
      console.log("User not authenticated.");
    }
  } catch (error) {
    console.error("Error storing order:", error);
  }
};

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("Payment processed!");

    // Prepare the order details
    const orderDetails = {
      totalAmount: tot,
      foodItems: cartItems.map((item) => ({
        id: item.id,
        name: item.title,
        
      })),
    };

    // Store the order details in Firebase
    await storeOrderInFirebase(orderDetails);

    // modal
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="container mx-auto mt-4 max-w-4xl">
      <h2 className="text-2xl font-semibold mb-2">Payment</h2>
      <form onSubmit={handlePayment} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block font-medium mb-1">
            Card Number:
          </label>
          <input
            type="text"
            id="cardNumber"
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expiryDate" className="block font-medium mb-1">
            Expiry Date:
          </label>
          <input
            type="text"
            id="expiryDate"
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cvv" className="block font-medium mb-1">
            CVV:
          </label>
          <input
            type="text"
            id="cvv"
            className="border p-2 w-full"
            required
          />
        </div>
        <p className="mb-4">Total Amount: 💶{tot}</p>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Pay Now
        </button>
      </form>
      {showModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-y-auto">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div className="bg-white rounded-lg p-8 max-w-sm mx-auto relative animate-bounceInDown">
            {countdown > 0 ? (
              <>
                <p
                  className="text-xl mb-4 animate-pulse"
                  style={{ animationDuration: "2s" }}
                >
                  Be strong my friend, your food is on its way!
                </p>
                <p>Order will arrive in approximately {countdown} ct!? ⏳</p>
              </>
            ) : (
              <>
                <p>Your order has arrived!</p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
