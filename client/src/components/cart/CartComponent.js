import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import CartList from "./CartList"
import { ToFixed } from "../../utils/financials"

const CartComponent = ({ cart }) => {

    const tax = 8.9
    let cartSubTotal = cart.reduce((prev, curr) => {
        return prev + curr.itemTotal
    }, 0)

    return (
        <>
        <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Shopping Cart</li>
                        </ol>
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
                                {
                                    <CartList />
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

    <section id="do_action">
		<div className="container">
			<div className="heading">
				<h3>What would you like to do next?</h3>
				<p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<div className="total_area">
						<ul>
							<li>Cart Sub Total <span>${ToFixed(cartSubTotal)}</span></li>
							<li>Eco Tax <span>${tax}</span></li>
							<li>Shipping Cost <span>Free</span></li>
							<li>Total <span>${ (parseFloat(cartSubTotal) + parseFloat(tax)).toFixed(2) }</span></li>
						</ul>
							<Link to="/checkout" className="btn btn-default check_out">Check Out</Link>
					</div>
				</div>
			</div>
		</div>
	</section>
        </>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cart
})

export default connect(mapStateToProps)(CartComponent)