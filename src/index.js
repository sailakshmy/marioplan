import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import {Provider, useSelector} from 'react-redux';
import thunk from'redux-thunk';
import {reduxFirestore, getFirestore, createFirestoreInstance} from 'redux-firestore';
import {ReactReduxFirebaseProvider, getFirebase, isLoaded} from 'react-redux-firebase'; 
import firebase,{fbConfig} from './config/fbConfig';

const store = createStore(rootReducer,
  compose(
  applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
  reduxFirestore(firebase, fbConfig, {
   /* useFirestoreForProfile:true,// This is to inform firebase reducer that we want to connect to firestore db
    userProfile : 'users', /*informing the reducer that this is the collections that has to be synced
    with the profile object in the state */
    attachAuthIsReady: true,
    firebaseStateName: 'firebaseReducer'
    })
    //reactReduxFirebase(fbConfig)
   )
);

const rrfConfig = {
  userProfile: 'users',/*informing the reducer that this is the collections that has to be synced
  with the profile object in the state */
  useFirestoreForProfile : true,//This is to inform firebase reducer that we want to connect to firestore db
  enableRedirectHandling : false,
  resetBeforeLogin: false
}
const rrfProps = {
  firebase: firebase,
  config: fbConfig,
  config : rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  userProfile: 'users',//where the profiles are stored in DB
  presence: 'presence',//where the list of online users is stored in the DB
  sessions:'sessions'
}

function AuthIsLoaded({children}){
  const auth = useSelector(state => state.firebase.auth);
  if(!isLoaded(auth))
    return <div>Loading Screen...</div>
  return children;
}

//store.firebaseAuthIsReady.then(()=>{
  ReactDOM.render(
    <React.StrictMode>
      <Provider store= {store}> 
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
      <App />
      </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
//})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
