import { combineReducers } from "redux"
import products from "./products"
import category from "./category"
import cart from "./cart"
import auth from "./auth"
import alert from "./alert"
import orders from "./order"
import formAlert from "./formAlert"

export default combineReducers({
    products,
    category,
    cart,
    auth,
    alert,
    orders,
    formAlert
})