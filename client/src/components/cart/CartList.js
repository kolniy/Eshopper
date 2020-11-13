import React from "react"
import { connect } from "react-redux"
import CartItem from "./CartItem"
import NoItems from "./NoItems"

const CartList = ({ cart }) => {
    return (
        cart.length === 0 ? (<NoItems />) : (cart.map((item) => <CartItem key={item.itemId} cartItem={item} />))
    )
}

const mapStateToProps = (state) => ({
    cart: state.cart
})

export default connect(mapStateToProps)(CartList)