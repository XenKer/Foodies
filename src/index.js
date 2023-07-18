import React from "react";
import { createRoot } from "react-dom/client"; 
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import reducer from "./context/reducer";

import App from './App';
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";

createRoot(document.getElementById("root")).render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Router>
);
