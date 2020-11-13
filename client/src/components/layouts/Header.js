import React from 'react'
import { Link } from "react-router-dom"
import { connect } from "react-redux"

const Header = ({ cart }) => {
        return (
            <div>
                <header id="header">
		<div className="header_top">
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<div className="contactinfo">
							<ul className="nav nav-pills">
								<li><a href="https://www.kolaniyi.com"><i className="fa fa-phone"></i> +2347038954278</a></li>
								<li><a href="https://www.kolaniyi.com"><i className="fa fa-envelope"></i> kolaniyi3@gmail.com</a></li>
							</ul>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="social-icons pull-right">
							<ul className="nav navbar-nav">
								<li><a href="https://www.kolaniyi.com"><i className="fa fa-facebook"></i></a></li>
								<li><a href="https://www.kolaniyi.com"><i className="fa fa-twitter"></i></a></li>
								<li><a href="https://www.kolaniyi.com"><i className="fa fa-linkedin"></i></a></li>
								<li><a href="https://www.kolaniyi.com"><i className="fa fa-dribbble"></i></a></li>
								<li><a href="https://www.kolaniyi.com"><i className="fa fa-google-plus"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div className="header-middle">
			<div className="container">
				<div className="row">
					<div className="col-sm-4">
						<div className="logo pull-left">
							<Link to="/"><img src="/images/home/logo.png" alt="eshopper logo" /></Link>
						</div>
					</div>
					<div className="col-sm-8">
						<div className="shop-menu pull-right">
							<ul className="nav navbar-nav">
								<li><Link to="/dashboard/user"><i className="fa fa-user"></i> Account</Link></li>
								<li><Link to="/checkout"><i className="fa fa-crosshairs"></i> Checkout</Link></li>
								<li><Link to="/cart"><i className="fa fa-shopping-cart"></i> Cart {
									cart.length > 0 && <div className="badge">{cart.length}</div>
								}</Link></li>
								<li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<div className="header-bottom">
			<div className="container">
				<div className="row">
					<div className="col-sm-9">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						</div>
						<div className="mainmenu pull-left">
							<ul className="nav navbar-nav collapse navbar-collapse">
								<li><Link to="/" className="active">Home</Link></li>
								<li><Link to="/products">Products</Link></li>
								<li className="dropdown"><Link to="/products">Shop<i className="fa fa-angle-down"></i></Link>
                                    <ul role="menu" className="sub-menu">
										<li><Link to="/checkout">Checkout</Link></li> 
										<li><Link to="/cart">Cart</Link></li> 
										<li><Link to="/login">Login</Link></li> 
                                    </ul>
                                </li>  
								<li><Link to="/contact">Contact</Link></li>
							</ul>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="search_box pull-right">
							<input type="text" placeholder="Search"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
            </div>
        )
}

const mapStateToProps = (state) => ({
	cart: state.cart
})

export default connect(mapStateToProps)(Header)
