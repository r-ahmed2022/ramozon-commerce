import React, {useContext} from 'react'
import { Context } from '../Context'

export default function CartItem(props) {
    const {removeFromCart, deleteQty, updateQty} = useContext(Context)
  return (
    <div className="cart-item-card">
             <div className='cart-info'>
                <img className="item_img" src={props.item.download_url}  alt="product"/>
                <div className="bottom-div">
                    <span   className="editqty" onClick={() =>deleteQty(props.item)}>-</span>     
                    <p>Qty: {props.item.Qty}</p>
                    <span  className="editqty" onClick={() =>updateQty(props.item)}>+</span>               
               </div>
             </div>
             <div className="item-author">
                <span className="price">Seller</span>
                <span>{props.item.author}</span>
             </div>
            <div className="cart-price">
                <span className="price">Price</span>
                <span>${props.item.price}</span>
            </div>
            <div className="delete-item"><i className="small material-icons delete-icon"  onClick={() => removeFromCart(props.item, props.item.id)}>delete</i>
            <span>Delete</span></div>

    </div>
  )
}
