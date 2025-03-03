import React from 'react'
import { BrowserRouter, Router } from 'react-router-dom'
import Header from './Header/Header'
import Banner from './Banner/Banner'
import Cards from "../components/Cards/Cards";
import Footer from './Footer/Footer'
const Homepage = () => {
  return (
    <>
      <Header/>
      <Banner/>
       <Cards/>
       <Footer/>
   </>
  )
}

export default Homepage
