import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase.config";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const auth = getAuth(app);
        const firestore = getFirestore(app);

        if (auth.currentUser) {
          const userId = auth.currentUser.uid;

          const querySnapshot = await getDocs(collection(firestore, "orders"));

          // map the data of query to  orders array
          const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const userOrders = ordersData.filter((order) => order.userId === userId);

          // orders state ->  user's orders
          setOrders(userOrders);
        } else {
          console.log("User not authenticated.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
  <div className="container ml-80 px-4 py-6 right-5">
    <h2 className="text-3xl font-semibold mb-4">Orders</h2>
    {orders.length > 0 ? (
      <ul className="space-y-6">
        {orders.map((order) => (
          <li key={order.id} className="border rounded-md p-4">
            <p className="text-xl font-semibold mb-2">Order ID: {order.id}</p>
            <p className="text-lg">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
            <p className="text-lg">Total Amount: 💶{order.totalAmount}</p>
            {order.foodItems ? (
              <div>
                <p className="text-lg mt-4">Order Details:</p>
                <ul className="list-disc ml-8">
                  {order.foodItems.map((item) => (
                    <li key={item.id} className="text-base">
                      <p>Food ID: {item.id}</p>
                      <p>Food Name: {item.name}</p>
                      
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No order details found.</p>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p>No orders found.</p>
    )}
  </div>
);
}

export default Orders;
