import React from "react"
import { connect } from "react-redux"
import { incrementCartItem, decrementCartItem, removeFromCart} from "../../actions/cart"
import { Link } from "react-router-dom"
import { ToFixed } from "../../utils/financials"

const CartItem = ({ cartItem, removeItem, incrementItem, decrementItem }) => {

    const checkCartAndDecrement = () => {
        if(cartItem.itemQuantity > 1){
            decrementItem(cartItem.itemId)
        } else if(cartItem.itemQuantity === 1) {
            removeItem(cartItem.itemId)
        }
    }

    return (
        <tr>
        <td className="cart_product">
            <Link to={`/product/${cartItem.itemId}`}> <img className="img-responsive" src={cartItem.itemImg} alt="" /></Link>
        </td>
        <td className="cart_description">
    <h4><Link to={`/product/${cartItem.itemId}`}>   {cartItem.itemName}</Link></h4>
        </td>
        <td className="cart_price">
            <p>{cartItem.itemPrice}</p>
        </td>
        <td className="cart_quantity">
            <div className="cart_quantity_button">
                <button className="cart_quantity_up" onClick={e => incrementItem(cartItem.itemId)}> + </button>
                <input className="cart_quantity_input" type="text" name="quantity" value={cartItem.itemQuantity} autocomplete="off" size="2" />
                <button className="cart_quantity_up" onClick={e => checkCartAndDecrement()}> - </button>
            </div>
        </td>
        <td className="cart_total">
            <p className="cart_total_price">${ToFixed(cartItem.itemTotal)}</p>
        </td>
        <td className="cart_delete">
            <button className="cart_quantity_delete" onClick={e => removeItem(cartItem.itemId)}><i className="fa fa-times"></i></button>
        </td>
    </tr> 
    )
}

const mapDispatchToProps = (dispatch) => ({
    incrementItem : (id) => dispatch(incrementCartItem(id)),
    decrementItem : (id) => dispatch(decrementCartItem(id)),
    removeItem: (id) => dispatch(removeFromCart(id))
})

export default connect(null, mapDispatchToProps)(CartItem)