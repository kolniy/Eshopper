import React from "react"
import { Link } from "react-router-dom"

const CategoryItem = ({ categoryInfo }) => {
    return (
    <div className="panel panel-default">
		<div className="panel-heading">
    <h4 className="panel-title"><Link to={`/products/category/${categoryInfo.name}`} >{categoryInfo.name}</Link></h4>
		</div>
	</div>
    )
}

export default CategoryItem