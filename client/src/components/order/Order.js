import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getOrder } from "../../actions/order"
import Spinner from "../layouts/Spinner"

const Order = ({ order, loading, match }) => {

    // useEffect use here to generate the current order in view. Irrespective of if the order was just created and user is redirected to this page
    useEffect(() => {
        getOrder(match.params.orderId)
    }, [match.params.orderId])
    return <>
        {
            loading && order === null ? <Spinner /> : <><div className="container">
                    <p className="text-center">{order._id}: Order id</p>
                    <p className="text-center">
                        {order.refnum}: Order reference Number
                    </p>
                </div></>
        }
    </>
}

const mapStateToProps = (state) => ({
    order: state.order.order,
    loading: state.order.loading
})

const mapDispatchToProps = (dispatch) => ({
    getOrder: (orderId) => dispatch(getOrder(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)