import React, { useState } from "react"
import { connect } from "react-redux"
import { Redirect, useLocation } from "react-router-dom"
import { registerUser, loginUser } from "../../actions/auth"

const Register = ({ authenticated, register, login }) => {

        const location = useLocation()
        const params = new URLSearchParams(location.search)
        const redirect = params.get('redirect')

    const [userRegDetails, updateUserRegDetails] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [userLoginDatails, updateUserLoginDetails] = useState({
        email: '',
        password: ''
    })

    const updateReg = (e) => updateUserRegDetails({
        ...userRegDetails,
      [e.target.name] : e.target.value
    })

    const updateLog = (e) => updateUserLoginDetails({
        ...userLoginDatails,
        [e.target.name]: e.target.value
    })

    const onRegSubmit = (e) => {
        e.preventDefault()
        register(userRegDetails)
    }

    const onLoginSubmit = (e) => {
        e.preventDefault()
        login(userLoginDatails)
    }

    if(authenticated && redirect !== null){  // line to check that the user is authenticated and wants to checkout, so user can be redirected to checkout page after authentication
       return <Redirect to="/checkout" />
    } else if(authenticated){  // line simply checks for authentication and redirects home page
        return <Redirect to="/" />
    }

    return <>
    <section id="form">
		<div className="container">
			<div className="row">
				<div className="col-sm-4 col-sm-offset-1">
					<div className="login-form">
						<h2>Login to your account</h2>
						<form onSubmit={e => onLoginSubmit(e)}>
							<input type="email" required onChange={e => updateLog(e)} name="email" placeholder="Your Email" />
							<input type="password" required onChange={e => updateLog(e)} name="password" placeholder="Password" />
							<button type="submit" className="btn btn-default">Login</button>
						</form>
					</div>
				</div>
				<div className="col-sm-1">
					<h2 className="or">OR</h2>
				</div>
				<div className="col-sm-4">
					<div className="signup-form">
						<h2>New User Signup!</h2>
						<form onSubmit={e => onRegSubmit(e)}>
							<input type="text" required onChange={e => updateReg(e)} name="name" value={userRegDetails.name}  placeholder="Name"/>
							<input type="email" required onChange={e => updateReg(e)} name="email" value={userRegDetails.email} placeholder="Email Address"/>
							<input type="password" required onChange={e => updateReg(e)} name="password" value={userRegDetails.password} placeholder="Password"/>
							<button type="submit" className="btn btn-default">Signup</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
}

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated
})

const mapDispatchToProps = (dispatch) => ({
    register : (user) => dispatch(registerUser(user)),
    login : (loginInfo) => dispatch(loginUser(loginInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)