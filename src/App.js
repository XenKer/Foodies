import React, { useEffect } from 'react';
import { Header, CreateContainer, MainContainer, Food } from './components';
import { useStateValue } from './context/StateProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { actionType } from './context/reducer';
import CheckoutPage from './components/CheckoutPage';
import Reviews from './components/Reviews';
import RegistrationForm from './components/RegistrationForm';
import Payment from './components/Payment';
import Orders from './components/Orders';

export const App = () => {
  const [{ foodItems, cartItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTotalAmount = () => {
    let totalPrice = cartItems.reduce((accumulator, item) => {
      return accumulator + item.qty * item.price;
    }, 0);
    return totalPrice;
  };

  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-slate-200">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/food/:id" element={<Food />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/registration" element={<RegistrationForm />} />
            <Route
              path="/payment"
              element={<Payment tot={getTotalAmount()} />}
            />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
