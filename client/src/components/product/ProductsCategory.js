import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getProductsByCategory } from "../../actions/products"
import FeaturedProductItem from "./FeatureProductItem"
import Spinner from "../../components/layouts/Spinner"



const ProductsCategory = ({ match, getProductsByCategory }) => {
        useEffect(() => {
            getProductsByCategory(match.params.categoryName.toLowerCase().trim())
        }, [getProductsByCategory, match.params.categoryName])
    return <p>{}</p>
}

const mapDispatchToProps = (dispatch) => ({
    getProductsByCategory: (categoryName) => dispatch(getProductsByCategory(categoryName))
})

export default connect(null, mapDispatchToProps)(ProductsCategory)
