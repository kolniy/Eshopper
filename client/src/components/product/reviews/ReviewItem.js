import React from "react"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import StartRatings from "react-star-ratings"

const ReviewItem = ({ review }) => {

    const linkPreventDefault = (e) => e.preventDefault()

    return (
        <div className="col-sm-12">
			<ul>
                <li><Link onClick={e => linkPreventDefault(e)} to=""><i className="fa fa-user"></i>{review.name}</Link></li>
    <li><Link  onClick={e => linkPreventDefault(e)} to=""><i className="fa fa-clock-o"></i><Moment format="HH:mm">{review.date}</Moment></Link></li>
    <li><Link  onClick={e => linkPreventDefault(e)} to=""><i className="fa fa-calendar-o"></i><Moment format="DD/MM/YYYY">{review.date}</Moment></Link></li>
				</ul>
                <p>{review.comment}</p>
                <b>Rating: </b> <StartRatings starHoverColor="orangered" rating={review.star} starDimension='15px' starRatedColor="orangered" numberOfStars={5} starSpacing='2px' name='rating' />
                <br />
                <hr />
	</div>
    )
}

export default ReviewItem