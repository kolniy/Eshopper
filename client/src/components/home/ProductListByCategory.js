import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getProductsByCategoryForHomePage } from "../../actions/products"
import ProductCategoryItem from "./ProductCategoryItem"
import Spinner from "../layouts/Spinner"

const ProductListByCategory = ({ categoryProducts, getProductsByCategory, categoryName, productsLoading }) => {

    useEffect(() => {
        getProductsByCategory(categoryName.toLowerCase().trim())
    }, [categoryName, getProductsByCategory])

    return (
           productsLoading === true ? <Spinner/> : <> {
             categoryProducts.length === 0 ? <p className="text-center">No Products in this Category</p> : categoryProducts.map((product) => <ProductCategoryItem  product={product} key={product._id} />)
           }
           </>
    )
}

const mapStateToProps = (state) => ({
    categoryProducts: state.products.productsCategory,
    productsLoading: state.products.loading
})

const mapDispatchToProps = (dispatch) => ({
    getProductsByCategory: (categoryName) => dispatch(getProductsByCategoryForHomePage(categoryName))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListByCategory)