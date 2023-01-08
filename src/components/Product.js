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
            <div className="product-category">
                <span>{props.product.category}</span>
                <span className="fa fa-star checked"></span>
                <span>{props.product.rating.rate}</span>
             </div>
           <img className="product-item-img" src={props.product.image} alt="product" />
               <div className="product-info">
               <span className="product-title">{props.product.title}</span>            
                   <div className="product-rating">
                   <span>Stock:&nbsp;{props.product.rating.count}</span>
                   <span className="product_price">${props.product.price}</span>
                   </div>

               </div>
    </div>
  )
}

