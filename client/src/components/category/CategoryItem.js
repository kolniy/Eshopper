import React from "react"
// import { Link } from "react-router-dom"

const CategoryItem = ({ categoryInfo }) => {
    return (
    <div className="panel panel-default">
		<div className="panel-heading">
    <h4 className="panel-title"><a href="www.kolaniyi.com">{categoryInfo.name}</a></h4>
		</div>
	</div>
    )
}

export default CategoryItem