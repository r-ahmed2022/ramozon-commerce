import React, {useContext} from 'react'
import CartItem from "./components/CartItem"
import {Context}  from "./Context"

export default function Cart(props) {
  const {cartItems, cart_Total} = useContext(Context)
   const cartArray = cartItems.map((item) => {
            return <CartItem key={item.id} item={item}/>
   })
  return (
    <div className="cart">
    <h4> Shopping Cart</h4>
       <hr />
       {cartArray}
       <div className="total">
           <span>Total: &nbsp;&nbsp;</span>
           <span>${cart_Total}</span>
       </div>
    </div>
  )
}
