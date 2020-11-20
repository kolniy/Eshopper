import { CREATE_ORDER } from "../actions/types"

const initialState = {
    order: null,
    orders: [],
    loading: true
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
            default:
               return state;
        }
}

export default ordersReducer

