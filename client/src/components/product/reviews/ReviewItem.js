import React from "react"
import { Link } from "react-router-dom"
import Moment from "react-moment"

const ReviewItem = ({ review }) => {

    const linkPreventDefault = (e) => e.preventDefault()

    return (
        <div class="col-sm-12">
			<ul>
                <li><Link onClick={e => linkPreventDefault(e)} to=""><i class="fa fa-user"></i>{review.name}</Link></li>
    <li><Link  onClick={e => linkPreventDefault(e)} to=""><i class="fa fa-clock-o"></i><Moment format="HH:mm">{review.date}</Moment></Link></li>
    <li><Link  onClick={e => linkPreventDefault(e)} to=""><i class="fa fa-calendar-o"></i><Moment format="DD/MM/YYYY">{review.date}</Moment></Link></li>
				</ul>
                <p>{review.comment}</p>
	</div>
    )
}

export default ReviewItem