import customerReducer from './customerReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    customer: customerReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer