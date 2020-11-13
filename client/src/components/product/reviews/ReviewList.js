import React from "react"
import ReviewItem from "./ReviewItem"

const ReviewList = ({ reviews }) => {
    return (
         reviews.map((review) => <ReviewItem review={review} key={review._id} /> )
    )
}

export default ReviewList