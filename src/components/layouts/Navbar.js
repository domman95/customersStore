import React from 'react'
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

class Navbar extends React.Component {

    hideMenu = () => {
        document.querySelector('.active').classList.remove('active')
    }

    render() {
        const { auth } = this.props

        return (
            <div className="navbar" onClick={this.hideMenu}>
                {auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar)