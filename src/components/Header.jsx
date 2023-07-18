import React, { useState } from "react";
import { MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase.config";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import RegistrationForm from "./RegistrationForm";

function Header() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    if (!user) {
      try {
        let signInMethod;

        if (email && password) {
          signInMethod = signInWithEmailAndPassword(firebaseAuth, email, password);
        } else {
          // signInWithPopup if no creds are provided
          signInMethod = signInWithPopup(firebaseAuth, provider);
        }

        const {
          user: { refreshToken, providerData },
        } = await signInMethod;

        dispatch({
          type: actionType.SET_USER,
          user: providerData[0],
        });

        localStorage.setItem('user', JSON.stringify(providerData[0]));
        setEmail('');
        setPassword('');
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    window.location.reload();
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-6 px-18">
      <div className="hidden md:flex w-full h-full items-center justify-between">

        <Link to={"/"} className="flex items-center gap-3">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={Logo}
            className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
            alt="logo"
          />

          <motion.p
            whileHover={{ scale: 1.1 }}
            className="text-headingColor text-xl font-bold animate-color-change"
          >
            Foodies
          </motion.p>
        </Link>

        <div className="flex items-center">
          <div className="relative flex items-center justify-center right-8" onClick={showCart}>
            <span className="text-textColor text-2xl cursor-pointer">🛒</span>
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-m text-black font-semibold">{cartItems.length}</p>
              </div>
            )}
          </div>

          {user ? (
            <div className="relative">
              <motion.img
                whileTap={{ scale: 0.6 }}
                src={user.photoURL || Avatar}
                className="w-10 min-w[40px] h-10 min-h-[40px] cursor-pointer rounded-full"
                alt="userprofile"
                onClick={login}
              />
              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="w-40 -ml-10 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-1 px-4 py-2"
                >
                  {user.email === "kerasidisxenokratis@gmail.com" && (
                    <Link to={"/createItem"}>
                      <p
                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                        onClick={() => setIsMenu(false)}
                      >
                        Create Food <MdAdd />
                      </p>
                    </Link>
                  )}
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={logout}
                  >
                    Logout <MdLogout />
                  </p>
                  <Link to="/orders">
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      Orders 🧾
                    </p>
                  </Link>
                </motion.div>
              )}
            </div>
          ) : (
           <div className="flex items-center">
              
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="px-2 py-1 text-sm bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
              />
              
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="px-2 py-1 text-sm bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
              />
              <Link to="/registration">
            <button className="px-4 py-2 text-base font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 mr-4">Register</button>
          </Link>
              <button
                onClick={login}
                className="px-4 py-2 text-base font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
              
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
