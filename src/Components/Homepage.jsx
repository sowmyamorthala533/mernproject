import React from 'react'
import { BrowserRouter, Router } from 'react-router-dom'
// import Header from './Header/Header'
// import Banner from './Banner/Banner'
import Cards from "../Components/Cards/Cards";
import Footer from './Footer/Footer'
const Homepage = () => {
  return (
    <>
    <div className="w-100 min-vh-100 d-flex flex-column">
      <Cards />
      <Footer />
    </div>
   </>
  )
}

export default Homepage
