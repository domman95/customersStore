import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'

const CustomerCard = (props) => {
    if (props.customers) {
        const { customers } = props;

        let letters = [];

        for (let i = 0; i < customers.length; i++) {
            if (!letters.includes(customers[i].lastName[0])) {
                letters.push(customers[i].lastName[0])
            }
        }

        if (props.state.length > 0) {
            let matchesLetters = props.state.map(customer => {
                return customer.lastName[0]
            })

            let removeDup = matchesLetters.filter((a, b) => {
                return matchesLetters.indexOf(a) === (b)
            })


            let cards = removeDup.map(card => {
                return (
                    <ul className="eachLetterCustomersCard" key={card}>
                        <p>{card}</p>
                        {
                            props.state.map(customer => {
                                return customer.lastName[0] === card ? (
                                    <Link to={`/customer/${customer.id}`} style={{ color: 'white', textDecoration: 'none' }} key={customer.id}><li>{customer.fullName} {customer.phoneNumber ? <div>tel. {customer.phoneNumber}</div> : null}</li></Link>
                                ) : null
                            })
                        }
                    </ul>
                )
            })



            return (
                <div className="customerCards" >
                    {cards}
                </div>
            )
        } else {
            let cards = letters.map(card => {
                return (
                    <ul className="eachLetterCustomersCard" key={card}>
                        <p>{card}</p>
                        {customers.map(customer => {
                            return customer.lastName[0] === card ? (
                                <Link to={'/customer/' + customer.id} style={{ color: 'white', textDecoration: 'none' }} key={customer.id} ><li>{customer.fullName} {customer.phoneNumber ? <div>tel. {customer.phoneNumber}</div> : null}</li></Link>
                            ) : null
                        })}
                    </ul>
                )
            })

            return (
                <div className="customerCards" >
                    {cards}
                </div>
            )
        }
    } else {
        return (
            <div className="customerCards" >
                <h1>Wczytuję listę klientów...</h1>
            </div>
        )

    }
}


const mapStateToProps = (state) => {
    const customers = state.firestore.ordered.customers
    if (customers) {
        customers.sort((a, b) => a.fullName > b.fullName ? 1 : -1)
    }
    return {
        customers
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'customers'
        }
    ])

)(CustomerCard)