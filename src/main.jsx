import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RenewMartLandingPage from './Components/LandingPage.jsx'
import Jsonfile from './Components/Homepage.jsx'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './Components/Login.jsx'
import Homepage from './Components/Homepage.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<RenewMartLandingPage/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/Homepage" element={<Homepage/>}/>
   </Routes>
   </BrowserRouter>
   
  // </StrictMode>,
)
