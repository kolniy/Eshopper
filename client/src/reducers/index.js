import { combineReducers } from "redux"
import products from "./products"
import category from "./category"
import cart from "./cart"
import auth from "./auth"
import alert from "./alert"
import order from "./order"

export default combineReducers({
    products,
    category,
    cart,
    auth,
    alert,
    order
})