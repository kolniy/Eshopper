import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const ReviewForm = ({ auth }) => {
    return <>
    {
    auth.authenticated === false && auth.user === null ? <p className="text-center">Sign In <Link className="theme-color" to="/signin">Here</Link>, To Leave A Review</p> : (<>
        <p><b>Write Your Review</b></p>						
				<form action="#">
					<span>
					<input type="text" placeholder="Your Name"/>
					<input type="email" placeholder="Email Address"/>
					</span>
					<textarea name="" ></textarea>
					<b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
					<button type="button" class="btn btn-default pull-right">
				Submit
			</button>
		</form>
    </>)
}
    </>
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ReviewForm)