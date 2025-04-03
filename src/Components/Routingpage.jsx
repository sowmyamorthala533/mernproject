
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import ProductDetails from "./ProductDetails";
import Sell from "./Sell";

const Routingpage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sell" element={<Sell />} />  {/* ✅ Added Sell Page Route */}
      </Routes>
    </>
  );
};

export default Routingpage;
