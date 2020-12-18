import React, { useEffect } from "react"
import { connect } from "react-redux"
import Spinner from "../layouts/Spinner"
import { getProduct } from "../../actions/products"
import CategoryList from "../category/CategoryList"
import SingleProductDetails from "./SingleProductDetails"

const Product = ({ match, getProduct, product, productLoading }) => {

    useEffect(() => {
        getProduct(match.params.productId)
        document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
    }, [getProduct, match.params.productId])

    return (
        <>
           <div className="container">
               <div className="row">
                   <div className="col-sm-3">
                       <div className="left-sidebar">
                           <h2>Category</h2>
                           {
                               <CategoryList />
                           }
                         <div className="shipping text-center">
							<img src="/images/home/shipping.jpg" alt="" />
						</div>
                        <br/>
                     </div>
                   </div>
                 {
                     productLoading === false && product !== null ? <SingleProductDetails product={product} /> : <div className="col-sm-9 padding-right margin-top-for-spinner-page">
                         <div className="col-sm-4 col-sm-offset-4">
                         <Spinner />
                         </div>
                     </div>
                 }
               </div>
           </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    product: state.products.product,
    productLoading: state.products.loading
})

const mapDispatchToProps = (dispatch) => ({
    getProduct: (id) => dispatch(getProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
