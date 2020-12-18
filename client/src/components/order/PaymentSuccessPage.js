import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { updateOrderSuccessStatus } from "../../actions/order"
import Spinner from "../layouts/Spinner"

const PaymentSuccessPage = ({ updateOrderStatus, order, match }) => {

    const orderId = match.params.orderId

    useEffect(() => {
       updateOrderStatus(orderId)
       document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
    }, [updateOrderStatus, orderId])

    return <>
        {
            order !== null ? <>
                <div className="container">
                <p>Your Order has been payed for successfully. Click <Link to={`/order/${orderId}`}>Here</Link> Go Back to Order Page.</p>
                </div>
            </> : <>
                <Spinner/>
            </>
        }
    </>
}

const mapStateToProps = (state) => ({
    order: state.orders.order
})

const mapDispatchToProps = (dispatch) => ({
    updateOrderStatus : (orderId) => dispatch(updateOrderSuccessStatus(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccessPage)

