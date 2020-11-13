import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getProducts } from "../../actions/products"
import CategoryList from "../../components/category/CategoryList"
import FeaturedProductItem from "./FeatureProductItem"
import Spinner from "../../components/layouts/Spinner"

const Products = ({ products, loading, getProducts }) => {
    useEffect(() => {
        getProducts()
    }, [getProducts])

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
							<img src="images/home/shipping.jpg" alt="" />
						</div>
                        <br/>
                    </div>
                </div>
                <div className="col-sm-9 padding-right">
                        <div className="featured_items">
                            <h2 className="title text-center">
                                Our Products List
                            </h2>
                            { 
                             loading ? <Spinner /> : products.map((product) => <FeaturedProductItem key={product._id}  productInfo={product} />)
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
    products: state.products.allProducts,
    loading: state.products.loading
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)