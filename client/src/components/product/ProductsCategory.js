import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getProductsByCategory } from "../../actions/products"
import FeaturedProductItem from "./FeatureProductItem"
import CategoryList from "../category/CategoryList"
import Spinner from "../../components/layouts/Spinner"



const ProductsCategory = ({ match, getProductsByCategory, productsCategory, loading }) => {
        useEffect(() => {
            getProductsByCategory(match.params.categoryName.toLowerCase().trim())
        document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
        }, [getProductsByCategory, match.params.categoryName])

    return <>
         <section>
        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                    <div className="left-sidebar">
                        <h2>Category</h2>
                        {
                          <CategoryList  />
                        }
    
                        <div className="shipping text-center">
							<img src="/images/home/shipping.jpg" alt="" />
						</div>
                        <br/>
                    </div>
                </div>
                <div className="col-sm-9 padding-right">
                        <div className="featured_items">
                            <h2 className="title text-center">
                                Products from {match.params.categoryName} Category
                            </h2>
                            { 
                             loading && productsCategory === undefined ? <Spinner /> : <>
                                 {
                                     productsCategory.length === 0 ? <p className="text-center">No Products in this Category</p> : productsCategory.map((product) => <FeaturedProductItem key={product._id}  productInfo={product} />)
                                 }
                            </>
                            }
                        </div>
					<div>
						
					</div>
                </div>
            </div>
        </div>
    </section>
    </>
}

const mapStateToProps = (state) => ({
    productsCategory: state.products.productsCategory,
    loading: state.products.loading
})

const mapDispatchToProps = (dispatch) => ({
    getProductsByCategory: (categoryName) => dispatch(getProductsByCategory(categoryName))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsCategory)
