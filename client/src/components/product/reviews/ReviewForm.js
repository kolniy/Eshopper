import React, { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import StartRatings from "react-star-ratings"
import { reviewProduct } from "../../../actions/products"

const ReviewForm = ({ auth, addProductReview, productId }) => {

	const [ reviewComment, updateComment ] = useState('')
	const [ star, updateStar ] = useState(0)

	const changeProductRating = (rating) => {
		updateStar(rating)
	}

	const submitReview = (e) => {
		e.preventDefault()
		addProductReview({
			comment: reviewComment,
			star
		}, productId)

		updateComment('')
		updateStar(0)
	}

    return <>
    {
    !auth.authenticated && auth.user === null ? <p className="text-center">Sign In <Link className="theme-color" to="/login">Here</Link>, To Leave A Review</p> : (<>
        <p><b>Write Your Review</b></p>						
				<form onSubmit={e => submitReview(e)}>
					<textarea required name="comment" value={reviewComment} onChange={e => updateComment(e.target.value)}></textarea>
					<b>Rating: </b> <StartRatings starHoverColor="orangered" rating={star} starDimension='30px' starRatedColor="orangered" changeRating={changeProductRating} numberOfStars={5} starSpacing='4px' name='rating' />
					<button type="submit" className="btn btn-default pull-right">
				Submit
			</button>
		</form>
    </>)
}
    </>
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	productId: state.products.product._id
})

const mapDispatchToProps = (dispatch) => ({
	addProductReview : (reviewData, productId) => dispatch(reviewProduct(reviewData, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)