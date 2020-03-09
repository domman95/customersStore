import React from 'react'
import { Spring } from 'react-spring/renderprops'
import { connect } from 'react-redux'
import SignedOutLinks from './layouts/SignedOutLinks'
import SignedInLinks from './layouts/SignedInLinks'

class Dashboard extends React.Component {


    render() {
        const { user } = this.props

        return (
            <div className="dashboard">
                <Spring
                    from={{ opacity: 0, left: -500 }}
                    to={{ opacity: 1, left: 0 }}
                    config={{ duration: 1000 }}
                >
                    {props =>
                        <div className="header" style={props}>
                            <p>Twoje miejsce</p>
                            <p>do zarządzania</p>
                            <p>klientami</p>
                        </div>
                    }
                </Spring>
                <Spring
                    from={{ opacity: 0, transform: 'scale(0)' }}
                    to={{ opacity: 1, transform: 'scale(1)' }}
                >
                    {props => user.firstName ? <SignedInLinks style={props} /> : <SignedOutLinks style={props} />}
                </Spring>
            </div>
        )

    }
}

const mapStateToProp = (state) => {
    return {
        user: state.firebase.profile
    }
}

export default connect(mapStateToProp)(Dashboard)