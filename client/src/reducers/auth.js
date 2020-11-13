const initialState = {
    token: localStorage.getItem('token') !== null ? localStorage.getItem('token') : "",
    authenticated: false,
    loading: true,
    user: null,
    error: {}
}

const authReducer = (state = initialState, action) => {
    const { type } = action

    switch (type) {
        // case LOGIN:
        //     return {
        //         ...state,
        //         authenticated: true,
        //         loading: false,
        //         token: payload.token
        //     }
        default:
            return state
    }
}

export default authReducer