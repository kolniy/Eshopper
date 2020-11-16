import axios from "axios"
import setAuthToken from "../utils/setAuthToken"
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER, AUTH_ERROR, LOGOUT } from "./types"
import { setAlert } from "./alert"

export const loadUser = () => {
    return async (dispatch) => {
        if(localStorage.getItem('token')){
            setAuthToken(localStorage.getItem('token'))
        }

        try {
            const res = await axios.get('/api/users')
            dispatch({
                type: LOAD_USER,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
}

export const registerUser = ({ name, email, password }) => {
        return async (dispatch) => {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const type = "user"
            const body = JSON.stringify({ name, email, password, type })
            try {
                const res = await axios.post('/api/users', body, config)
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data 
                })

                dispatch(loadUser())
            } catch (err) {
                const errors = err.response.data.errors

                if(errors){
                    errors.forEach(error => {
                        dispatch(setAlert(error.msg, 'danger'))
                    });
                }
                dispatch({
                    type: REGISTER_FAIL
                })

            }
        }
}

export const loginUser = ({ email, password }) => {
    return async (dispatch) => {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const body = JSON.stringify({ email, password })
            try {
            const res = await axios.post('/api/users/login', body, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch(loadUser())
        } catch (err) {
            const errors = err.response.data.errors

            if(errors){
                errors.forEach(error => {
                    dispatch(setAlert(error.msg, 'danger'))
                });
            }
                dispatch({
                    type: LOGIN_FAIL
                })
        }
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        })
    }
}