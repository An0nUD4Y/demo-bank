import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./app/store"; // Update the path to your Redux setup file
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import "./styles/main.scss";

// Layouts
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

// Pages
import Error404 from "./pages/404";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import Modal from "./pages/Modal";

import reportWebVitals from "./reportWebVitals";
// import { store } from "../src/features/user";

const isLogged = localStorage.getItem("isLogged");
const userEmail = localStorage.getItem("userEmail");
const userPassword = localStorage.getItem("userPassword");

console.log(isLogged);
console.log(userEmail);
console.log(userPassword);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user" element={<User />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
