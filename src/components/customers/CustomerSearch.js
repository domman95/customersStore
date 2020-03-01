import React from 'react'

const CustomerSearch = ({ handleChange }) => {


    return (
        <div className="searchCustomersPanel" >
            <input className="searchCustomer" autoComplete="off" onChange={handleChange} type="text" name="searchCustomer" placeholder="wpisz imię lub nazwisko klienta" />
        </div>
    )
}

export default CustomerSearch