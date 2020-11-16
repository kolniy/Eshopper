import React, { useState } from "react"
import { connect } from "react-redux"
import { addToCart } from "../../actions/cart"
import { Link } from "react-router-dom"
import ReviewList from "./reviews/ReviewList"
import ReviewForm from "./reviews/ReviewForm"

const SingleProductDetails = ({ product: {
	_id,
    image,
    name,
    shortDesc,
    price,
    oldprice,
    longDesc,
    availability,
    reviews
}, addToCart, cart }) => {

	const [ itemInCart, setItemInCart ] = useState(1)
	const updateItemInCart = (value) => {
		if(!isNaN(value)){
			setItemInCart(value)
		} else {
			alert("Value must be a whole Number")
			setItemInCart(1)
		}
	}

	const item = {
		_id,
		image,
		name,
		price,
		quantity: itemInCart
	}

	const addProductToCart = () => {
		return addToCart(item)
	}

	const itemExistsInCart = cart.find((item) => item.itemId === _id)

	const checkCartAndAvailability = () => {
		if(availability > 0){
			if(itemExistsInCart !== undefined){
			return <Link className="btn btn-default add-to-cart" to="/cart">View Cart</Link>
			} else {
						return <button type="button" onClick={e => addProductToCart()} class="btn btn-fefault cart">
				<i class="fa fa-shopping-cart"></i>
				Add to cart
			</button>
			}
		} else {
			return <button className="btn btn-default add-to-cart" type="button" disabled>Currently Out of Stock</button>
		}
	}

    return (
        <>
        <div className="col-sm-9 padding-right">
					<div className="product-details">
						<div className="col-sm-5">
							<div className="view-product">
								<img src={image} alt="" />
							</div>

						</div>
						<div className="col-sm-7">
							<div className="product-information">
								<img src="/images/product-details/new.jpg" className="newarrival" alt="" />
                                <h2 style={{textTransform:"uppercase"}}>{name}</h2>
                                <p><b>Description:</b> {shortDesc}</p>
								{/* todo how display rating in react  */}
								<span>
                                    <p><span>US ${price}</span></p>
									<label>Quantity:</label>
									<input type="text" value={itemInCart} onChange={e => updateItemInCart(e.target.value)} />
									{
										checkCartAndAvailability()
									}
								</span>
								<p><b>Old Price:</b>{" "}{<span className="strike-through">{oldprice}</span>}</p>
                                <p><b>Availability:</b>{" "}{availability} Left In Stock</p>
								<p><b>Condition:</b> New</p>
								<p><b>Product By:</b> E-SHOPPER</p>
							</div>
						</div>
					</div>
					
					<div className="category-tab shop-details-tab">
						<div className="col-sm-12">
							<ul className="nav nav-tabs">
								<li><a href="#details" data-toggle="tab">Details</a></li>
                                <li className="active"><a href="#reviews" data-toggle="tab">Reviews {reviews.length}</a></li>
							</ul>
						</div>
						<div className="tab-content">
							<div className="tab-pane fade" id="details" >
                                <p>{longDesc}</p>
							</div>
							
							<div className="tab-pane fade active in" id="reviews" >
								{
									<>
									<ReviewList reviews={reviews} />
									<ReviewForm />
									</>
								}
							</div>
							
						</div>
					</div>
				</div>
        </>
    )
}

const mapStateToProps = (state) => ({
	cart : state.cart
})

const mapDispatchToProps = (dispatch) => ({
	addToCart : (item) => dispatch(addToCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductDetails)