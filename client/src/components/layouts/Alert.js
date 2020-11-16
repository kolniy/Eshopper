import React from "react"
import { connect } from "react-redux"

const Alert = ({ alerts }) => (
    alerts !== null && alerts.length !== 0 && alerts.map((alert) => 
    <div className="container">
         <div key={alert.id} className={`alert alert-${alert.alertType}`} role="alert">
        <div className="alert-link">{alert.msg}</div>
    </div>
    </div>
    )
)

const mapStateToProps = (state) => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)