import React from 'react'
import {Routes, Route} from "react-router-dom"
import Header from "./components/Header"
import Products from "./Products"
import Cart from "./Cart"

function App() {
  return (
    <div className="wrapper">
       <Header />
      <Routes>
          <Route exact path="/" element={ <Products />} />
          <Route  path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
