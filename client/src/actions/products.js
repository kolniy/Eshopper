import axios from "axios"
import { GET_PRODUCT, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS, PRODUCT_ERROR, ADD_PRODUCT_REVIEW } from "./types"
import { setFormAlert } from "./setFormAlert"

// gets products for the feature item section of the homepage
export const getProductsForHomePage = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/product/?limit=6')
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const getProducts = () => {
    return async (dispatch) => {
        try {
           const res = await axios.get('/api/product')
           dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        })
        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

// gets products for the category display for homepage
export const getProductsByCategoryForHomePage = (categoryName) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/product/category/${categoryName}?limit=4`)
            dispatch({
                type: GET_PRODUCTS_BY_CATEGORY,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const getProductsByCategory = (categoryName) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/product/category/${categoryName}`)
            dispatch({
                type: GET_PRODUCTS_BY_CATEGORY,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

// gets single products for product page 
export const getProduct = (id) => {
    return async (dispatch) => {
        try {
        const res = await axios.get(`/api/product/${id}`)
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const reviewProduct = ({ comment, star }, productId ) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify({ comment, star })
        try {
            const res = await axios.put(`/api/product/review/${productId}`, body, config)
            dispatch({
                type: ADD_PRODUCT_REVIEW,
                payload: res.data
            })
            dispatch(setFormAlert('Review added successfully', 'success'))
        } catch (err) {
            const errors = err.response.data.errors
            dispatch({
                type: PRODUCT_ERROR,
                payload: err
            })
            if(errors) {
                errors.forEach((error) => {
                    dispatch(setFormAlert(error.msg, 'danger'))
                })
            }
        }

    }
}