import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops'
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
                    <button className="material-icons" onClick={() => this.props.history.push('/')} >arrow_back</button>
                    <p>Rejestracja</p>
                </div>
                <div className="signUpPanel">
                    <Spring
                        from={{ opacity: 0, transform: 'scale(0)' }}
                        to={{ opacity: 1, transform: 'scale(1)' }}
                    >
                        {props =>
                            <form onSubmit={this.handleSubmit} style={props}>
                                <input type="text" name="firstName" onChange={this.handleChange} placeholder="imię" />
                                <input type="text" name="lastName" onChange={this.handleChange} placeholder="nazwisko" />
                                <input type="e-mail" name="email" onChange={this.handleChange} placeholder="e-mail" />
                                <input type="password" name="password" onChange={this.handleChange} placeholder="hasło" />
                                <button type="submit" className="btn" value="Zarejestruj się">Zarejestruj się</button>
                                {authError && error ? <AuthErrorPopUp authError={authError} closeAuthError={this.closeAuthError} /> : null}
                            </form>
                        }
                    </Spring>
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