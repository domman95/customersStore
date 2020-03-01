import React from 'react'
import { Link } from 'react-router-dom'


const SignedOutLinks = () => {

    return (
        <ul className="signedOutLinks">
            <Link to="/signin" style={{ textDecoration: 'none' }}><li>Zaloguj się</li></Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}><li>Zarejestruj się</li></Link>
        </ul>
    )
}

export default SignedOutLinks