import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getOrder } from "../../actions/order"
import Spinner from "../layouts/Spinner"
import Moment from "react-moment"

const Order = ({ order, loading, match, getOrder }) => {

    useEffect(() => {
        getOrder(match.params.orderId)
    }, [match.params.orderId, getOrder])

    return <>
        {
            order === null && loading === true ? <Spinner /> : <><div className="container">
            <div className="col-sm-9">
                <div className="order-info">
                        <div className="shipping-section">
                                <h2 className="text-center title">
                                    Shipping Info
                                </h2>
                <p className="order-head-style">Name: </p>
                <p>{`${order.recipientFirstName} ${order.recipientLastName}`}</p>

                <p className="order-head-style">Phone Number: </p>
                <p>{`${order.recipientNumber}`}</p>

                <p className="order-head-style">Email: </p>
                <p>{`${order.recipientEmail}`}</p>

                <p className="order-head-style">Order Destination: </p>
                <p>{`${order.shippingAddress}, ${order.shippingState},`} {`${order.shippingCountry}`}</p>

                <div className="delivery-status">
                <p className="order-head-style">Delivery Status: </p>
                {
                         !order.deliveryStatus ? <>
                            <div className="alert alert-danger" role="alert">
                                <div className="alert-link">
                                    Your Order is yet to be delivered
                                </div>
                            </div>
                         </> : <>
                            <div className="alert alert-success" role="alert">
                                <div className="alert-link">
                        <p className="order-head-style">Order Delivered On: </p>
                         <Moment format="DD/MM/YYYY">
                             {
                                 order.deliveredAt
                             }
                         </Moment>
                                </div>
                            </div>
                         </>
                     }   
                </div>
                            </div>
        <div className="payment-section">
         <h2 className="text-center title"> Payment Details
                                    </h2>
            <p className="order-head-style">Payment Total :</p>
             <p className="total">${`${order.amount}`}</p>
                <p className="order-head-style">Payment status :</p>
                {
                    !order.paymentStatus ? <>
                        <div className="alert alert-danger" role="alert">
                                <div className="alert-link">
                                    You have an outstanding payment! Click the pay now button to Complete Order.
                                </div>
                            </div>
                    </> : <>
                    <div className="alert alert-success" role="alert">
                                <div className="alert-link">
                        <p className="order-head-style">Order Paid At: </p>
                         <Moment format="DD/MM/YYYY">
                             {
                                 order.deliveredAt
                             }
                         </Moment>
                                </div>
                            </div>
                    </>
                }
             </div>
            <div className="order-items-section">
                            <h2 className="text-center title">
                                       Your Ordered Items
                                    </h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="pay-action">
                        <h2 className="text-center title">
                            pay for your order
                                    </h2>
                        </div>
                    </div>
                </div></>
        }
    </>
}

const mapStateToProps = (state) => ({
    order: state.orders.order,
    loading: state.orders.loading
})

const mapDispatchToProps = (dispatch) => ({
    getOrder: (orderId) => dispatch(getOrder(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)