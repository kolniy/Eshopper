import { GET_PRODUCT ,GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, PRODUCT_ERROR } from '../actions/types'

const initialState = {
    allProducts: [],
    productsCategory: [],
    product: null,
    loading: true,
    error: {}
}   

const productReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_PRODUCTS: 
            return {
                ...state,
                allProducts: payload,
                loading: false
            }
        case GET_PRODUCTS_BY_CATEGORY: 
            return {
                ...state,
                productsCategory: payload,
                loading: false
            }
        case GET_PRODUCT: 
            return {
                ...state,
                product: payload,
                loading: false
            }
        case PRODUCT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }    
        default: 
            return state
    }
}


export default productReducer