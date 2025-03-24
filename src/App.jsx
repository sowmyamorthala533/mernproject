// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import RenewMartLandingPage from "./Components/RenewMartLandingPage";
// import Login from "./Components/Login";
// import Routingpage from "./Components/Routingpage";
// import Sell from "./Components/Sell";
// import { AuthProvider } from "./AuthContext";
// import Signuppage from "./Signuppage";
// const App = () => {
//   const [items,setItems]=useState([])
//   useEffect(()=>{
//     const fetchData=async ()=>{
//       const res=await fetch("http://localhost:3000")
//       const data=await res.json()
//       setItems(data.items)
//     }
//      fetchData();
//   },[])
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<RenewMartLandingPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/Routingpage/*" element={<Routingpage />} />
//           <Route path="/sell" element={<Sell />} />
//           <Route path="/signup" element={<Signuppage />} /> {/* Add signup route */}
//         </Routes>
//       </Router>
//     </AuthProvider>
//     {items.map(i=>(
//       <p>{i.name},{i.description}</p>
//     ))}
//   )
// }

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RenewMartLandingPage from "./Components/RenewMartLandingPage";
import Login from "./Components/Login";
import Routingpage from "./Components/Routingpage";
import Sell from "./Components/Sell";
import { AuthProvider } from "./AuthContext";
import Signuppage from "./Signuppage";

const App = () => {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000"); // Ensure correct API endpoint
  //       const data = await res.json();
  //       setItems(data.items || []); // Handle possible undefined data
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RenewMartLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Routingpage/*" element={<Routingpage />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/signup" element={<Signuppage />} /> {/* Add signup route */}
        </Routes>
      </Router>
      {/* {items.map((i, index) => (
        <p key={i.id || index}>{i.price}, {i.url},{i.Item}</p>
      ))} */}
    </AuthProvider>
  );
};

export default App;
