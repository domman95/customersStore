import React from 'react'

const CustomerSearch = ({ handleChange }) => {


    return (
        <div className="searchCustomersPanel" >
            <form>
                <input className="searchCustomer" autoComplete="off" onChange={handleChange} type="text" name="searchCustomer" placeholder="wpisz imię lub nazwisko klienta" />
            </form>
        </div>
    )
}

export default CustomerSearch