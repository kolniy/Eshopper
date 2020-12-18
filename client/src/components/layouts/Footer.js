import React from 'react'
// import { Link } from "react-router-dom"

// @todo add link to retrive single category for for a page

export const Footer = () => {
    return (
        <div>
            <footer id="footer">
		<div className="footer-top">
			<div className="container">
				<div className="row">
					<div className="col-sm-2">
						<div className="companyinfo">
							<h2><span>e</span>-shopper</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor</p>
						</div>
					</div>
					<div className="col-sm-7">
						<div className="col-sm-3">
							<div className="video-gallery text-center">
								<a href="https://www.kolaniyi.com">
									<div className="iframe-img">
										<img src="/images/home/iframe1.png" alt="" />
									</div>
									<div className="overlay-icon">
										<i className="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>Circle of Hands</p>
								<h2>24 DEC 2014</h2>
							</div>
						</div>
						
						<div className="col-sm-3">
							<div className="video-gallery text-center">
                            <a href="https://www.kolaniyi.com">
									<div className="iframe-img">
										<img src="/images/home/iframe2.png" alt="" />
									</div>
									<div className="overlay-icon">
										<i className="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>Circle of Hands</p>
								<h2>24 DEC 2014</h2>
							</div>
						</div>
						
						<div className="col-sm-3">
							<div className="video-gallery text-center">
                            <a href="https://www.kolaniyi.com">
									<div className="iframe-img">
										<img src="/images/home/iframe3.png" alt="" />
									</div>
									<div className="overlay-icon">
										<i className="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>Circle of Hands</p>
								<h2>24 DEC 2014</h2>
							</div>
						</div>
						
						<div className="col-sm-3">
							<div className="video-gallery text-center">
                            <a href="https://www.kolaniyi.com">
									<div className="iframe-img">
										<img src="/images/home/iframe4.png" alt="" />
									</div>
									<div className="overlay-icon">
										<i className="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>Circle of Hands</p>
								<h2>24 DEC 2014</h2>
							</div>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="address">
							<img src="/images/home/map.png" alt="" />
							<p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div className="footer-widget">
			<div className="container">
				<div className="row">
					<div className="col-sm-2">
						<div className="single-widget">
							<h2>Service</h2>
							<ul className="nav nav-pills nav-stacked">
								<li><a href="https://www.kolaniyi.com">Online Help</a></li>
								<li><a href="https://www.kolaniyi.com">Contact Us</a></li>
								<li><a href="https://www.kolaniyi.com">Order Status</a></li>
								<li><a href="https://www.kolaniyi.com">FAQ’s</a></li>
							</ul>
						</div>
					</div>
					<div className="col-sm-2">
						<div className="single-widget">
							<h2>Quock Shop</h2>
							<ul className="nav nav-pills nav-stacked">
								<li><a href="https://www.kolaniyi.com">T-Shirt</a></li>
								<li><a href="https://www.kolaniyi.com">Belts</a></li>
								<li><a href="https://www.kolaniyi.com">Gowns</a></li>
								<li><a href="https://www.kolaniyi.com">Shoes</a></li>
							</ul>
						</div>
					</div>
					<div className="col-sm-2">
						<div className="single-widget">
							<h2>Policies</h2>
							<ul className="nav nav-pills nav-stacked">
								<li><a href="https://www.kolaniyi.com">Terms of Use</a></li>
								<li><a href="https://www.kolaniyi.com">Privecy Policy</a></li>
								<li><a href="https://www.kolaniyi.com">Refund Policy</a></li>
								<li><a href="https://www.kolaniyi.com">Billing System</a></li>
								<li><a href="https://www.kolaniyi.com">Ticket System</a></li>
							</ul>
						</div>
					</div>
					<div className="col-sm-2">
						<div className="single-widget">
							<h2>About Shopper</h2>
							<ul className="nav nav-pills nav-stacked">
								<li><a href="https://www.kolaniyi.com">Company Information</a></li>
								<li><a href="https://www.kolaniyi.com">Careers</a></li>
								<li><a href="https://www.kolaniyi.com">Store Location</a></li>
								<li><a href="https://www.kolaniyi.com">Affillate Program</a></li>
								<li><a href="https://www.kolaniyi.com">Copyright</a></li>
							</ul>
						</div>
					</div>
					<div className="col-sm-3 col-sm-offset-1">
						<div className="single-widget">
							<h2>About Shopper</h2>
							<form action="#" className="searchform">
								<input type="text" placeholder="Your email address" />
								<button type="submit" className="btn btn-default"><i className="fa fa-arrow-circle-o-right"></i></button>
								<p>Get the most recent updates from <br />our site and be updated your self...</p>
							</form>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		<div className="footer-bottom">
			<div className="container">
				<div className="row">
					<p className="pull-left">Copyright © 2020 E-SHOPPER Inc. All rights reserved.</p>
					<p className="pull-left">Developed By  <span><a target="_blank" rel="noreferrer" href="https://www.kolaniyi.com/">kolawole olaniyi</a></span></p>
					<p className="pull-right">Template by <span><a target="_blank" rel="noreferrer" href="http://www.themeum.com">Themeum</a></span></p>
				</div>
			</div>
		</div>
	</footer>
        </div>
    )
}

export default Footer