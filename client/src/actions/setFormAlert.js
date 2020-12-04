import { v4 as uuidv4 } from "uuid"
import { SET_FORM_ALERT, REMOVE_FORM_ALERT } from "./types"

export const setFormAlert = (msg, alertType, timeout = 4000) => {
        return (dispatch) => {
            const id = uuidv4()
            dispatch({
                type: SET_FORM_ALERT,
                payload: {
                    msg,
                    alertType,
                    id
                }
            })

            setTimeout(() => {
                dispatch({
                    type: REMOVE_FORM_ALERT,
                    payload: id
                })
            }, timeout);
        }
}
