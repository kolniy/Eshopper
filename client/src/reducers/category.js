import { GET_CATEGORIES } from "../actions/types"

const initialState = {
    categories : [],
    loading: true,
    error: {}
}

const categoryReducer = (state = initialState, action) => {
        const { type, payload } = action

        switch (type) {
            case GET_CATEGORIES:
                return {
                    ...state,
                    categories: payload,
                    loading: false
                }
            default:
               return state
        }
}


export default categoryReducer