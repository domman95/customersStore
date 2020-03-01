import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions'
import AuthErrorPopUp from './AuthErrorPopUp';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        error: null
    }



    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state, this.isError)
    }

    isError = () => {
        this.setState({ error: true })
    }

    closeAuthError = () => {
        this.setState({ error: false })
    }

    render() {
        const { auth, authError } = this.props
        const { error } = this.state
        if (auth.uid) return <Redirect to="/" />
        return (
            <div className="signIn">
                <div className="signInHeader">
                    <i className="material-icons" onClick={() => this.props.history.push('/')} style={{ cursor: 'pointer' }}>arrow_back</i>
                    <p>Logowanie</p>
                </div>
                <div className="signInPanel">
                    <form onSubmit={this.handleSubmit}>
                        <input type="email" name="email" onChange={this.handleChange} placeholder="email" />
                        <input type="password" name="password" onChange={this.handleChange} placeholder="hasło" />
                        <input type="submit" className="btn" value="Zaloguj się" />
                        {authError && error ? <AuthErrorPopUp authError={authError} closeAuthError={this.closeAuthError} /> : null}
                        <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}><p>Nie masz konta? Zarejestruj się!</p></Link>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds, isError) => dispatch(signIn(creds, isError))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)