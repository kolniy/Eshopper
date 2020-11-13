import { combineReducers } from "redux"
import products from "./products"
import category from "./category"
import cart from "./cart"

export default combineReducers({
    products,
    category,
    cart
})