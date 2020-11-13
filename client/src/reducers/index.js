import { combineReducers } from "redux"
import products from "./products"
import category from "./category"
import cart from "./cart"
import auth from "./auth"

export default combineReducers({
    products,
    category,
    cart,
    auth
})