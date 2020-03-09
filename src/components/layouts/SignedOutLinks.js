import React from 'react'
import { Link } from 'react-router-dom'


const SignedOutLinks = (props) => {

    return (
        <ul className="signedOutLinks" style={props.style}>
            <Link to="/signin" style={{ textDecoration: 'none' }}><li>Zaloguj się</li></Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}><li>Zarejestruj się</li></Link>
        </ul>
    )

}

export default SignedOutLinks