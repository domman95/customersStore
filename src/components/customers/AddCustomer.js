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
        if ((e.target.value.length === 3 || e.target.value.length === 7) && e.target.name === 'phoneNumber' && this.state.clickedKey !== "Backspace") {
            e.target.value = e.target.value + '-'
        } else if (e.target.value.length === 9 && e.target.name === 'phoneNumber' && !e.target.value.includes('-')) {
            let modifiedPhoneNumber = e.target.value.split('')
            modifiedPhoneNumber.splice(3, 0, '-')
            modifiedPhoneNumber.splice(7, 0, '-')
            e.target.value = modifiedPhoneNumber.join('')
        }

        this.setState({
            [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const form = document.querySelector('form')
        form.firstName.value === '' || form.lastName.value === '' ? alert('Wypełnij wszystkie pola!') : this.props.createCustomer(this.state)
        // this.props.createCustomer(this.state.users)
        this.setState({
            firstName: '',
            lastName: '',
            phoneNumber: ''
        })
        form.firstName.value = ''
        form.lastName.value = ''
        form.phoneNumber.value = ''
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
                        <input autoComplete="off" type="text" name="firstName" onChange={this.handleChange} pattern="^[a-zA-Z]*" placeholder="Imię" />
                        <input autoComplete="off" type="text" name="lastName" onChange={this.handleChange} pattern="^((?=[a-zA-Z,]*['.-][a-zA-Z,]*$)[a-zA-Z,'.-]+$|[a-zA-Z]*)" placeholder="Nazwisko" />
                        <input autoComplete="off" type="tel" name="phoneNumber" onChange={this.handleChange} pattern="^[0-9]{3}-[0-9]{3}-[0-9]{3}" maxLength="11" placeholder="tel. 123-456-789" />
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