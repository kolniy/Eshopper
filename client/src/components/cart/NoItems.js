import React from "react"
import { Link } from "react-router-dom"

const NoItems = () => (<>
    <div className="no-items">
    <p>You currently Have No Items In Your Cart. Click Below To Continue Shopping!</p>
    <Link className="btn btn-default add-to-cart" to="/products">Go To Shop</Link>
    </div>
    </>
)

export default NoItems