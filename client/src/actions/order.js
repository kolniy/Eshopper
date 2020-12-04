import { GET_ORDER, ORDER_ERROR} from "./types"
import { clearCart } from "./cart"
import axios from "axios"
import { setAlert } from "./alert"

export const createOrder = (orderData, history) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify(orderData)
        try {
            const res = await axios.post('/api/order/create', body, config)
            dispatch(setAlert("Order was placed Successfully", 'success'))
            dispatch(clearCart())
            history.push(`/order/${res.data._id}`)
        } catch (err) {
            const errors = err.response.data.errors

            if(errors) {
                errors.forEach(error => {
                    dispatch(setAlert(`${error.msg} at ${error.param}`, 'danger'))
                });
            }
            dispatch({
                type: ORDER_ERROR,
                payload: {
             msg: err.response.statusText,
             status: err.response.status,
                }
            })
        }
    }
}

export const getOrder = (orderId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/order/${orderId}`)
            dispatch({
                type: GET_ORDER,
                payload: res.data
            })
            console.log(orderId)
        } catch (err) {
            dispatch({
                type: ORDER_ERROR,
                payload: {
             msg: err.response.statusText,
             status: err.response.status,
                }
            })
        }
    }
}