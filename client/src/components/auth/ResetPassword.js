import React, { useState } from "react"

const ResetPassword = () => {

    const [email, updateEmail] = useState('')
    const resetPassword = (e) => {
        e.preventDefault()

    }

    return (
        <>
            <section className="password-reset">
                <div className="container">
                    <div className="col-sm-4 col-sm-offset-4">
                        <div className="login-form">
                        <h2>Enter your email address Below</h2>
                        <p>A mail will be sent to that email address, use that to reset your password</p>
                         <form onSubmit={e => resetPassword(e)}>
                        <input type="email" value={email} required onChange={e => updateEmail(e.target.value)} name="email" placeholder="Your Email" />
	                     <button type="submit" className="btn btn-default">Submit Email </button>
                         </form>
                        </div>
                    </div>
                </div>
            </section>
            <br/>
            <br/>
        </>
    )
}

export default ResetPassword