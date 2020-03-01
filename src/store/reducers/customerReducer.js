const initState = {}

const customerReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CUSTOMER':
            return state
        case 'CREATE_CUSTOMER_ERROR':
            return state
        case 'DELETE_CUSTOMER':
            return state
        case 'DELETE_CUSTOMER_ERROR':
            return state
        case 'CREATE_VISIT':
            return state
        case 'CREATE_VISIT_ERROR':
            return state
        case 'DELETE_VISIT':
            return state
        case 'DELETE_VISIT_ERROR':
            return state
        default:
            return state
    }
}

export default customerReducer

