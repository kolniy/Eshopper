import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import CategoryList from "../../components/category/CategoryList"
import FeaturedProductList from "../../components/product/FeaturedProductList"
import ProductListByCategory from "../../components/home/ProductListByCategory"

const Landing = ({ isCategoryLoaded }) => {

	const [ categoryNameState, setCategoryNameState ] = useState('trousers')

	const loadCategory = (e) => {
		e.preventDefault()
		setCategoryNameState(e.target.innerHTML)
	}

    return <>
        {/* carousel section for display some products */}
        <section id="slider">
		<div className="container">
			<div className="row">
				<div className="col-sm-12">
					<div id="slider-carousel" className="carousel slide" data-ride="carousel">
						<ol className="carousel-indicators">
							<li data-target="#slider-carousel" data-slide-to="0" className="active"></li>
							<li data-target="#slider-carousel" data-slide-to="1"></li>
							<li data-target="#slider-carousel" data-slide-to="2"></li>
						</ol>
						
						<div className="carousel-inner">
							<div className="item active">
								<div className="col-sm-6">
									<h1><span>E</span>-SHOPPER DISCOUNTS</h1>
									<h2>GREAT DISCOUNTS ON THE PRODUCTS YOU LOVE</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
									<button type="button" className="btn btn-default get">Get it now</button>
								</div>
								<div className="col-sm-6">
									<img src="images/home/girl1.jpg" className="girl img-responsive" alt="" />
									<img src="images/home/pricing.png"  className="pricing" alt="" />
								</div>
							</div>
							<div className="item">
								<div className="col-sm-6">
									<h1><span>E</span>-SHOPPER DELIVERY</h1>
									<h2>GET THE VERY BEST OF OUR DELIVERY SERVICES</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
									<button type="button" className="btn btn-default get">Get it now</button>
								</div>
								<div className="col-sm-6">
									<img src="images/home/girl2.jpg" className="girl img-responsive" alt="" />
									<img src="images/home/pricing.png"  className="pricing" alt="" />
								</div>
							</div>
							
							<div className="item">
								<div className="col-sm-6">
									<h1><span>E</span>-SHOPPER FREE REFUNDS</h1>
									<h2>100% REFUNDS FOR PRODUCTS YOU MAY RETURN</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
									<button type="button" className="btn btn-default get">Get it now</button>
								</div>
								<div className="col-sm-6">
									<img src="images/home/girl3.jpg" className="girl img-responsive" alt="" />
									<img src="images/home/pricing.png" className="pricing" alt="" />
								</div>
							</div>
							
						</div>
						
						<a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
							<i className="fa fa-angle-left"></i>
						</a>
						<a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
							<i className="fa fa-angle-right"></i>
						</a>
					</div>
					
				</div>
			</div>
		</div>
	</section>

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
                                Featured Items
                            </h2>
                            { 
                                <FeaturedProductList />
                            }
                        </div>
					<div>
						<p className="paragraph-before-the-tab">Some random stuff</p>
					<div className="category-tab">
						<div className="col-sm-12">
							<ul className="nav nav-tabs">
							   <li><Link to="/" onClick={e => loadCategory(e)}>Trousers</Link></li>
								<li><Link to="/" onClick={e => loadCategory(e)}>Sun glass</Link></li>
								<li><Link to="/" onClick={e => loadCategory(e)}>Shoes</Link></li>
								<li><Link to="/" onClick={e => loadCategory(e)}>Shirts</Link></li>
								<li><Link to="/" onClick={e => loadCategory(e)}>Belts</Link></li>
							</ul>
						</div>
					</div>
					<div className="tab-content">
						{
							<ProductListByCategory categoryName={categoryNameState} />
						}
					</div>
					</div>
                </div>
            </div>
        </div>
    </section>

    </>
}


export default Landing