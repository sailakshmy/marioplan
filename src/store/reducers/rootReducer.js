import authReducer from './authReducer';
import projectReducer from './projectReducer';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';//to sync the firestore data with redux's state in background
import {firebaseReducer} from 'react-redux-firebase';//to sync the firebase data(including authentication) service with the redux's state

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;