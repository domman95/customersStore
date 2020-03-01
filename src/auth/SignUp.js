import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../store/actions/authActions'
import AuthErrorPopUp from './AuthErrorPopUp';


class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.name === 'email' || 'password' ? e.target.value : e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.firstName === '' || this.state.lastName === '') {
            alert('Wypełnij wszystkie pola')
        } else {
            this.setState({ error: true })
            this.props.signUp(this.state)
        }
    }

    closeAuthError = () => {
        this.setState({ error: false })
    }

    render() {
        const { auth, authError } = this.props
        const { error } = this.state
        if (auth.uid) return <Redirect to="/" />
        return (
            <div className="signUp">
                <div className="signUpHeader">
                    <i className="material-icons" onClick={() => this.props.history.push('/')} style={{ cursor: 'pointer' }} >arrow_back</i>
                    <p>Rejestracja</p>
                </div>
                <div className="signUpPanel">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="firstName" onChange={this.handleChange} placeholder="imię" />
                        <input type="text" name="lastName" onChange={this.handleChange} placeholder="nazwisko" />
                        <input type="e-mail" name="email" onChange={this.handleChange} placeholder="e-mail" />
                        <input type="password" name="password" onChange={this.handleChange} placeholder="hasło" />
                        <input type="submit" className="btn" value="Zarejestruj się" />
                        {authError && error ? <AuthErrorPopUp authError={authError} closeAuthError={this.closeAuthError} /> : null}
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)