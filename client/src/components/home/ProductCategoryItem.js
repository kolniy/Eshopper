import React from "react"
import { connect } from "react-redux"
import { addToCart } from "../../actions/cart"
import { Link } from "react-router-dom"

const ProductCategoryItem = ({ product,cart, addProductToCart }) => {
    return (
        <div className="col-sm-3">
        <div className="product-image-wrapper">
            <div className="single-products">
                <div className="productinfo text-center">
                    <img src={product.image} alt="" />
                    <h2>${product.price}</h2>
                    <Link to={`/product/${product._id}`}><p>{product.name}</p></Link>
                    {
                      product.availability <= 0 ? <>
                        <p style={{fontWeight:"600", textTransform:"uppercase"}}>Currently out of stock</p>
                      </> : <>
                        {
                             cart.find((item) => item.itemId === product._id) !== undefined ? (
                                <Link className="btn btn-default add-to-cart" to="/cart">View Cart</Link>
                            ) : (
                             <button onClick={e => addProductToCart(product)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                            )
                        }
                      </>
                   }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryItem)