import React, { use } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate=useNavigate();
    const handleClick=()=>{
     navigate("/Homepage")
    }
  return (
    <>
     <button onClick={handleClick}>Login button</button>
    </>
  )
}

export default Login