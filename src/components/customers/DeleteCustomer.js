import React from 'react'

const DeleteCustomer = ({ customer, id, onClose, props }) => {

    const handleDelete = () => {
        props.deleteCustomer(id)
    }

    return (
        <div className="popUpDeleteCustomer">
            <div className="confirmDeleteCustomer">
                <h3>Czy chcesz, aby wszystkie dane klienta {customer.fullName.split(' ').reverse().toString().replace(',', ' ')} zostały usunięte?</h3>
                <div className="btns">
                    <button onClick={handleDelete} className="agree">Tak</button>
                    <button onClick={onClose} className="cancel">Nie</button>
                </div>
            </div>
        </div>
    )
}



export default DeleteCustomer