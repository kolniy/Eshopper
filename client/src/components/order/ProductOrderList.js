import React from "react"
import ProductOrderItem from "./ProductOrderItem"

const ProductOrderList = ({ products }) => {
    return <>
        {
            products.map((product) => {
                return <ProductOrderItem key={product.id} product={product} />
            })
        }
    </>
}

export default ProductOrderList