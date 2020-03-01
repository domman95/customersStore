import React from 'react'
import Navbar from './layouts/Navbar'
import { connect } from 'react-redux'

class Dashboard extends React.Component {


    handleClick = () => {
        document.querySelector('.navbar').classList.toggle('active')
    }

    render() {

        const { user } = this.props

        if (user.firstName) {
            return (
                <div className="dashboard">
                    <i className="material-icons menuBtn" onClick={this.handleClick} >menu</i>
                    <Navbar />
                    <div className="header">
                        <p>Witaj, </p>
                        <p>{user.firstName}!</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="dashboard">
                    <i className="material-icons menuBtn" onClick={this.handleClick} >menu</i>
                    <Navbar />
                    <div className="header">
                        <div className="headerText">
                            <p>Twoje miejsce</p>
                            <p>do zarządzania</p>
                            <p>klientami</p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProp = (state) => {
    return {
        user: state.firebase.profile
    }
}

export default connect(mapStateToProp)(Dashboard)