import React, { Component } from 'react';
import CustomerSearch from './CustomerSearch';
import CustomerCard from './CustomerCard';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Redirect } from 'react-router-dom';


class Customers extends Component {
    state = {
        customers: ''
    }


    render() {
        const { customers, auth } = this.props
        const handleChange = (e) => {
            let regex = new RegExp(e.target.value, 'i')
            let matchedCustomers = customers.filter(customer => {
                return e.target.value.match(/^[a-zA-Z]{3,}/) ? (customer.fullName.match(regex) || customer.fullName.split(' ').reverse().toString().replace(',', ' ').match(regex) ? customer : null) : null
            })
            this.setState({
                customers: matchedCustomers
            })
        }
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="customers">
                <div className="customersHeader">
                    <i className="material-icons" onClick={() => { this.props.history.push('/') }} style={{ cursor: 'pointer' }} >arrow_back</i>
                    <p>Lista klientów</p>
                </div>
                <CustomerSearch handleChange={handleChange} />
                <Link to="/addcustomer" style={{ textDecoration: 'none' }}><li className="addCustomerBtn">Dodaj klienta</li></Link>
                <CustomerCard state={this.state.customers} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.firestore.ordered.customers,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'customers' }
    ])

)(Customers)