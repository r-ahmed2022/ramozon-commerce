import React, {useContext} from 'react'
import {Link} from "react-router-dom"
import {Context} from "../Context"

export default function Header() {
    const {shoppingCart} = useContext(Context)
  return (
    <header>
      <nav className="navbar">
            <Link to="/" className="home"><h3>RiyZon commerce</h3></Link>
           <Link to="/cart" className="home"><span className="cartitems">{shoppingCart.length}</span><i className="large material-icons">shopping_cart</i>
</Link>

      </nav>
    </header>
  )
}
