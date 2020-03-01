/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {

    const handleClick = () => {
        props.signOut()
    }

    return (
        <ul className="signedInLinks">
            <Link to="/customers" style={{ textDecoration: 'none' }}><li><i className="material-icons">supervisor_account</i> Lista klientów</li></Link>
            <Link to="/addcustomer" style={{ textDecoration: 'none' }}><li><i className="material-icons">person_add</i> Dodaj klienta</li></Link>
            <Link to="/" onClick={handleClick} style={{ textDecoration: 'none', cursor: 'pointer' }}><li><i className="material-icons">meeting_room</i> Wyloguj się</li></Link>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)