import React, { useEffect } from "react"
import { connect } from "react-redux"
import FeatureProductItem from "./FeatureProductItem"
import { getProductsForHomePage } from "../../actions/products"
import Spinner from "../layouts/Spinner"


const FeaturedProductList = ({ products, getProducts, productsLoading }) => {
    useEffect(() => {
        getProducts()
    }, [getProducts])

    return (
       productsLoading === true ? <Spinner/> :  products.map((product) => {
        return <FeatureProductItem productInfo={product} key={product._id}/>
    })
    )
}

const mapStateToProps = (state) => ({
    products : state.products.allProducts,
    productsLoading: state.products.loading
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProductsForHomePage())
})

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProductList)
