import React from "react"

const ProductOrderItem = ({ product: {
    image, name, quantity, price, total
} }) => {
    return <>
        <div className="ordered-list-item">
            <div className="order-product-image">
            <img src={image} alt="order product img"/>
            </div>
            <p className="order-product-name">{name}</p>
            <p className="order-product-quantity">{quantity}</p>
            <p className="order-product-price">${price}</p>
            <p className="order-product-total">${total}</p>
        </div>
    </>
}

export default ProductOrderItem