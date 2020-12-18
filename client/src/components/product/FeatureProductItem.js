import React from "react"
import { connect } from "react-redux"
import { addToCart } from "../../actions/cart"
import { Link } from "react-router-dom"

const FeatureProductItem = ({ productInfo, addProductToCart, cart }) => {

    return (
   
    <div className="col-sm-4">
    <div className="product-image-wrapper">
        <div className="single-products">
                <div className="productinfo text-center">
                    <img src={productInfo.image} alt="" />
                        <h2>${productInfo.price}</h2>
                        <Link to={`/product/${productInfo._id}`}><p>{productInfo.name}</p></Link>
                   {
                      productInfo.availability <= 0 ? <>
                        <p style={{fontWeight:"600", textTransform:"uppercase"}}>Currently out of stock</p>
                      </> : <> 
                          {
                               cart.find((item) => item.itemId === productInfo._id) !== undefined ? (
                                <Link className="btn btn-default add-to-cart" to="/cart">View Cart</Link>
                            ) : (
                             <button onClick={e => addProductToCart(productInfo)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                            )
                          }
                      </>
                   }
                </div>
                <div className="product-overlay">
                    <div className="overlay-content">
                        <h2>${productInfo.price}</h2>
                        <Link to={`/product/${productInfo._id}`}><p>{productInfo.name}</p></Link>
                        {
                      productInfo.availability <= 0 ? <>
                        <p style={{fontWeight:"600", textTransform:"uppercase"}}>Currently out of stock</p>
                      </> : <> 
                          {
                               cart.find((item) => item.itemId === productInfo._id) !== undefined ? (
                                <Link className="btn btn-default add-to-cart" to="/cart">View Cart</Link>
                            ) : (
                             <button onClick={e => addProductToCart(productInfo)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                            )
                          }
                      </>
                   }
                    </div>
                </div>
        </div>
    </div>
</div>
)
}

const mapStateToProps = (state) => ({
    cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
    addProductToCart : (productInfo) => dispatch(addToCart(productInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(FeatureProductItem)