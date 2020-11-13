import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getCategories } from "../../actions/category"
import CategoryItem from "./CategoryItem"
import Spinner from "../layouts/Spinner"

const CategoryList = ({ categories, categoryLoading, getCategories }) => {
    useEffect(() => {
        getCategories()
    }, 
        [getCategories]
    )
    return (
        <div className="panel-group category-products">
            {
               categoryLoading === true ? <Spinner /> :  categories.map((category) => {
                return <CategoryItem categoryInfo={category} key={category._id} /> 
            })
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.category.categories,
    categoryLoading: state.category.loading
})

const mapDispatchToProps = (dispatch) => ({
    getCategories : () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)