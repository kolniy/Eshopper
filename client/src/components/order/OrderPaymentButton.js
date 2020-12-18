import React from "react"
import { connect } from "react-redux"
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js"
import { setAlert } from "../../actions/alert"

const OrderPaymentButton = ({ orderTotal, orderId, orderStatus }) => {

    const stripePromise = loadStripe('pk_test_51Hdy76D2aIw6sn6ULi1Wxgf7EImUdvxXZsXjCvwHS2m8xfi4c9g4ubvHSwq8vVritfunpHz5ZNLB3RzC40VlOP2f00JCujajKQ')

    const handleClick = async (e) => {
        try {

            const stripe = await stripePromise

            const response = await axios.post(`/api/order/paymentsession/${orderId}`)
    
            const session = response.data
    
            const result = await stripe.redirectToCheckout({
                sessionId: session.checkoutSessionId
            })

            if(result.error){
                throw new Error(result.error.message)
            }

        } catch (err) {
            setAlert(err, 'danger')
        }
    }

    return <>
        {
            orderStatus ? <p className="text-center">Order has been paid</p> : <button onClick={e => handleClick(e)} className="btn btn-primary pay-button">
            Pay ${ orderTotal }
        </button>
        }
    </>
}
// order id to experiment with 5fd9c9d20f9a46642c9b5e82
const mapDispatchToProps = (dispatch) => ({
    setAlert: (msg, type) => dispatch(setAlert(msg, type))
})

export default connect(null, mapDispatchToProps)(OrderPaymentButton)