import React, { useContext} from 'react'
import {Context} from "../Context"
import { useHook } from '../useHook'

export default function Product(props) {
  const [isHovered, ref] = useHook()
  const {toggleFavorite, addToCart} = useContext(Context)
  return (
    <div className="product-item" ref={ref}>
         {  isHovered && 
              <div className="hover-div">
                <i className="small material-icons heart"
                  onClick={() => toggleFavorite(props.product.id)}>
                  {props.product.isFavorite ? "favorite" : "favorite_border"}
                </i>
                <i className="small material-icons addcart" onClick={() => addToCart(props.product)}>add_shopping_cart</i>
           </div>
         }
           <img className="product-item-img" src={props.product.download_url} alt="product" />
               <span className="product_price">${props.product.price}</span>
        
    </div>
  )
}

