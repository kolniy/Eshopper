import axios from "axios"
import { GET_PRODUCT, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS, PRODUCT_ERROR } from "./types"

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
        const res = await axios.get(`/api/product/${id}`)
        try {
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
