import { displayAddedCustomerPopup } from '../../components/displayAddedCustomerPopup'

export const createCustomer = (customer) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('customers').add({
            ...customer,
            fullName: `${customer.lastName} ${customer.firstName}`
        }).then(docRef => {
            displayAddedCustomerPopup(docRef)
            dispatch({ type: 'CREATE_CUSTOMER', customer })
        }).catch((err) => {
            dispatch({ type: 'CREATE_CUSTOMER_ERROR', err })
        })
    }
}

export const deleteCustomer = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('customers').doc(id).delete().then(() => {
            dispatch({ type: 'DELETE_CUSTOMER', id })
            window.location.reload()
        }).catch((err) => {
            dispatch({ type: 'DELETE_CUSTOMER_ERROR', err })
        })
    }
}

export const createVisit = (visit, id, time, activeUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('customers').doc(id).collection('visits').add({
            time, visit, activeUser
        }).then(() => {
            window.location.reload()
            dispatch({ type: 'CREATE_VISIT', id })
        }).catch((err) => {
            dispatch({ type: 'CREATE_VISIT_ERROR', err })
        })
    }
}

export const deleteVisit = (id, userID) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('customers').doc(userID).collection('visits').doc(id).delete().then(() => {
            dispatch({ type: 'DELETE_VISIT', id })
            window.location.reload()
        }).catch((err) => {
            dispatch({ type: 'DELETE_VISIT_ERROR', err })
        })
    }
}