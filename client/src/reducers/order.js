import { CREATE_ORDER, GET_ORDER, ORDER_ERROR } from "../actions/types"

const initialState = {
    order: null,
    orders: [],
    loading: true,
    error: {}
}

const ordersReducer = (state = initialState, action) => {
    const { type, payload } = action

        switch (type) {
            case CREATE_ORDER:
                return {
                    ...state,
                    order: payload,
                    loading: false
                }
            case GET_ORDER: 
                return   {
                    ...state,
                    order: payload,
                    loading: false
                }    
            case ORDER_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: payload
                }    
            default:
               return state;
        }
}

export default ordersReducer

