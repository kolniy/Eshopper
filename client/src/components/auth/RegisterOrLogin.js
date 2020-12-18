import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Redirect, useLocation } from "react-router-dom"
import { registerUser, loginUser } from "../../actions/auth"
import { Link } from "react-router-dom"

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

    useEffect(() => {
        document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
    }, [])

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
        e.target.childNodes[3].innerText = "Please wait..."
        register(userRegDetails)
        updateUserRegDetails({
            name: '',
            email: '',
            password: ''
        })
        if(!authenticated){
            e.target.childNodes[3].innerText = "Signup"
        }
    }

    const onLoginSubmit = (e) => {
        e.preventDefault()
        e.target.childNodes[2].innerText = "Please wait..."
        login(userLoginDatails)
        updateUserLoginDetails({
            email: '',
            password: ''
        })
        if(!authenticated){
            e.target.childNodes[2].innerText = "Login"
        }
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
							<input type="email" value={userLoginDatails.email} required onChange={e => updateLog(e)} name="email" placeholder="Your Email" />
							<input type="password" value={userLoginDatails.password} required onChange={e => updateLog(e)} name="password" placeholder="Password" />
							<button type="submit" className="btn btn-default">Login</button>
						</form>
                        <br />
                        <p>Forgot your password. Click <Link className="theme-color" to="/resetpassword">Here</Link></p>
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