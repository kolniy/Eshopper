import React, { useState } from "react"
import { connect } from "react-redux"
import { Redirect, Link, withRouter } from "react-router-dom"
import { createOrder } from "../../actions/order"
import CartList from "../cart/CartList"
import Spinner from "../../components/layouts/Spinner"
import { ToFixed } from "../../utils/financials"

const Checkout = ({ authenticated, user, cart, createOrder, history }) => {

    const [checkoutInfo, updateCheckoutInfo] = useState({
        shippingAddress:'',
        recipientNumber:'',
        recipientEmail:'',
        recipientFirstName:'',
        recipientLastName:'',
        shippingCountry:'',
        shippingCity:'',
        shippingZipcode:'',
        shippingState:'',
        deliveryMsg:''
    })

    const {
        shippingAddress,
        recipientNumber,
        recipientEmail,
        recipientFirstName,
        recipientLastName,
        shippingCountry,
        shippingCity,
        shippingZipcode,
        shippingState,
        deliveryMsg
    } = checkoutInfo

    const tax = 8.9
    let cartSubTotal = cart.reduce((prev, curr) => {
        return prev + curr.itemTotal
    }, 0)

    const updateCheckout = (e) => updateCheckoutInfo({
        ...checkoutInfo,
        [e.target.name]: e.target.value
    })

    const submitCheckoutInfo = (e) => {
        const products = cart.map((cartItem) => {
            return {
                id: cartItem.itemId,
                name: cartItem.itemName,
                price: cartItem.itemPrice,
                image: cartItem.itemImg,
                quantity: cartItem.itemQuantity,
                total: cartItem.itemTotal
            }
        })
        const clientDetails = {
            firstname:recipientFirstName,
            lastname: recipientLastName,
            address: shippingAddress,
            number: recipientNumber,
            email: recipientEmail,
            country: shippingCountry,
            city: shippingCity,
            zipcode: shippingZipcode,
            state: shippingState,
            message:deliveryMsg
        }

        const {
            firstname,
            lastname,
            address,
            number,
            email,
            country,
            city,
            zipcode,
            state,
            message
        } = clientDetails

        createOrder({
            firstname,
            lastname,
            address,
            number,
            email,
            country,
            city,
            zipcode,
            state,
            message,
            products
        }, history)

    }

    const noAction = (e) => {
        return
    }

    if(!authenticated){
        return <Redirect to="/login?redirect=checkout" />
     }

    return user === null ? <Spinner /> : <>
    <section id="cart_items">
        <div className="container">
            <div className="breadcrumbs">
                <ol className="breadcrumb">
                  <li><Link to="/">Home</Link></li>
                  <li className="active">Check out</li>
                </ol>
            </div>

            <div className="review-payment">
                <h2>Review & Payment</h2>
            </div>

        <div className="table-responsive cart_info">
            <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                            <td className="image">Item</td>
                            <td className="description"></td>
                            <td className="price">Price</td>
                            <td className="quantity">Quantity</td>
                            <td className="total">Total</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <CartList />
                        <tr>
							<td colSpan="4">&nbsp;</td>
							<td colSpan="2">
								<table className="table table-condensed total-result">
									<tr>
										<td>Cart Sub Total</td>
										<td>${ToFixed(cartSubTotal)}</td>
									</tr>
									<tr>
										<td>Exo Tax</td>
                                            <td>${tax}</td>
									</tr>
									<tr className="shipping-cost">
										<td>Shipping Cost</td>
										<td>Free</td>		
									</tr>
									<tr>
										<td>Total</td>
										<td><span>${ (parseFloat(cartSubTotal) + parseFloat(tax)).toFixed(2) }</span></td>
									</tr>
								</table>
							</td>
						</tr>
                    </tbody>
                </table>
            </div>

            <div className="shopper-informations">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="shopper-info">
                            <p>Shopper Information</p>
                            <form>
                              <input type="text" onChange={e => noAction(e)} value={user.name} placeholder="Display Name" />
                                <input type="email" onChange={e => noAction(e)} value={user.email} placeholder="Email" />
                            </form>
                            <button onClick={submitCheckoutInfo} className="btn btn-primary">Place Order</button>
                        </div>
                    </div>
                    <div className="col-sm-5 clearfix">
                        <div className="bill-to">
                            <p>Ship To</p>
                            <div className="form-one">
                                <form>
                        <input type="text" name="recipientEmail" onChange={e => updateCheckout(e)} value={recipientEmail} placeholder="Email*" />
                        <input type="text" name="recipientFirstName" onChange={e => updateCheckout(e)} value={recipientFirstName} placeholder="First Name *" />
                        <input type="text" name="recipientLastName" onChange={e => updateCheckout(e)} value={recipientLastName} placeholder="Last Name *" />
                        <input type="text" name="shippingAddress" onChange={e => updateCheckout(e)} value={shippingAddress} placeholder="Address 1 *" />	
                        </form>
                            </div>
                            <div className="form-two">
                                <form>
                        <input type="text" name="shippingZipcode" onChange={e => updateCheckout(e)} value={shippingZipcode} placeholder="Zip / Postal Code *" />
                        <input type="text" name="shippingCountry" onChange={e => updateCheckout(e)} value={shippingCountry} placeholder="-- Country --"/>
                        <input type="text" name="shippingCity" onChange={e => updateCheckout(e)} value={shippingCity} placeholder="-- City --"/>
                        <input type="text" name="shippingState" onChange={e => updateCheckout(e)} value={shippingState} placeholder="-- State / Province / Region --" />
                        <input type="text" name="recipientNumber" onChange={e => updateCheckout(e)} value={recipientNumber} placeholder="Phone Number*" />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                    <div className="order-message">
                            <p>Shipping Order</p>
                            <textarea name="deliveryMsg" onChange={e => updateCheckout(e)} value={deliveryMsg} placeholder="Notes about your order, Special Notes for Delivery" rows="16"></textarea>
                        </div>	
                    </div>					
                </div>
        </div>
        </div>
    </section>
    <br/>
      </>
}

// eshopper todo list
// 1. remeber to add loading spinner to loogin, sign up and checkout buttons
// 2. work on the comment review system for single products 

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
    user: state.auth.user,
    cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
    createOrder: (order, history) => dispatch(createOrder(order, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))
