import React from "react"
import { connect } from "react-redux"

const FormsAlert = ({ formAlert }) => (
    formAlert !== null && formAlert.length !== 0 && formAlert.map((alert) => 
    <div key={alert.id} className="container">
         <div key={alert.id} className={`alert alert-${alert.alertType}`} role="alert">
        <div className="alert-link">{alert.msg}</div>
    </div>
    </div>
    )
)

const mapStateToProps = (state) => ({
    formAlert: state.formAlert
})

export default connect(mapStateToProps)(FormsAlert)