import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCustomer } from '../../store/actions/customerAction'

class AddCustomer extends Component {
    state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        clickedKey: ''
    }

    componentDidMount() {
        window.addEventListener('keydown', this.lookingBackspaceKey)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.lookingBackspaceKey)
    }

    lookingBackspaceKey = (e) => {
        this.setState({
            clickedKey: e.key
        })
    }


    handleChange = (e) => {
        if (e.target.value.length === 3 && e.target.name === 'phoneNumber' && this.state.clickedKey !== 'Backspace') {
            e.target.value = e.target.value + '-'
        } else if (e.target.value.length === 7 && e.target.name === 'phoneNumber' && this.state.clickedKey !== 'Backspace') {
            e.target.value = e.target.value + '-'
        }
        this.setState({
            [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.firstName === '' || this.state.lastName === '' || this.state.phoneNumber.length !== 11) {
            alert('Wypełnij wszystkie pola')
        } else {
            const form = document.querySelector('form')
            this.props.createCustomer(this.state)
            this.setState({
                firstName: '',
                lastName: '',
                phoneNumber: ''
            })
            form.firstName.value = ''
            form.lastName.value = ''
            form.phoneNumber.value = ''
        }
    }
    render() {
        return (
            <div className="addCustomer">
                <div className="addedCustomer"></div>
                <div className="addCustomerHeader">
                    <i className="material-icons" onClick={() => { this.props.history.goBack() }} style={{ cursor: 'pointer' }} >arrow_back</i>
                    <p>Dodawanie klienta</p>
                </div>
                <div className="addCustomerPanel">
                    <form onSubmit={this.handleSubmit}>
                        <input autoComplete="off" type="text" name="firstName" onChange={this.handleChange} placeholder="Imię" />
                        <input autoComplete="off" type="text" name="lastName" onChange={this.handleChange} placeholder="Nazwisko" />
                        <input autoComplete="off" type="tel" name="phoneNumber" onChange={this.handleChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" maxLength="11" placeholder="tel. 123-456-789" />
                        <input type="submit" className="btn" value="Dodaj" />
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCustomer: (customer) => dispatch(createCustomer(customer))
    }
}

export default connect(null, mapDispatchToProps)(AddCustomer)