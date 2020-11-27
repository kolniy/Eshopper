import { ADD_TO_CART, REMOVE_FROM_CART, DECREMENT_CART_ITEM, INCREMENT_CART_ITEM, CLEAR_CART } from "../actions/types"

const initialState = localStorage.getItem('cartList') === null ? [] : JSON.parse(localStorage.getItem('cartList'))

const cartReducer = (state = initialState, action ) => {
    const { type, payload } = action

    switch (type) {
        case ADD_TO_CART:
            return [
                payload,
                ...state
            ]
        case REMOVE_FROM_CART: 
            return state.filter(({ itemId }) => itemId !== payload )
        case INCREMENT_CART_ITEM: 
            return state.map((item) => {
                if(item.itemId === payload.id){
                    return {
                        ...item,
                        ...payload.cartUpdates
                    }
                } else {
                   return item
                }
            })
        case DECREMENT_CART_ITEM: 
            return state.map((item) => {
            if(item.itemId === payload.id){
                return {
                    ...item,
                    ...payload.cartUpdates
                }
            } else {
               return item
            }
        })
        case CLEAR_CART: 
            return []
        default:
           return state
    }
}

export default cartReducer