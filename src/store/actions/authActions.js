//import firebase from '../../config/fbConfig';


export const signIn = (credentials) => {
    return (dispatch, getState,{getFirebase}) => {// We can do this because of thunk..Done in the same way as projectActions.js
        //1.Initialise the firebase instance
        const firebase = getFirebase(); 
        //2.Communicate with the project and sign the user in using firebase
        /**If the email and password are correct, we are going to successfully sign the user in to the
        firebase Application and will send us a response. This response could take some time and that makes
        this a promise that will handle an async call. */
        firebase.auth().signInWithEmailAndPassword(credentials.email,credentials.password) 
        .then(()=>{
            dispatch({type:'LOGIN_SUCCESS'});
        })
        .catch((err)=>{ 
            dispatch({type:'LOGIN_FAILED', err});
        })
    }
}

export const signOut = () =>{
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
        .then(()=>{
            dispatch({type:'SIGNOUT_SUCCESS'});
        });
    }
}

export const signUp = (newUser) => {

    return (dispatch,getState, {getFirebase,getFirestore})=>{
        /**Here we need firebase and firestore because
         * getFirebase = to sign up the new user using the authentication service by Firebase
         * getFirestore = to communicate with the Firestore db
         */
        const firebase = getFirebase();
        const firestore = getFirestore();

        //Interact with Firebase auth and generate the new user 
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp)=>{ //This response will contain information about the user that we have just signed up
            /*It doesn't matter if the users collection doesn't exist yet. Firestore will create it otherwise
            Since we want to link the document using the firebase auth generated UID, we will use the .doc()
            instead of the .add() method */
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName : newUser.firstName,
                lastName : newUser.lastName,
                initials : newUser.firstName[0] + newUser.lastName[0]
            })
        })//This will also return a promise, so use another then() to dispatch an action
        .then(()=>{
            dispatch({type:'SIGNUP_SUCCESS'})
        }).catch((err) => {
            dispatch({type:'SIGNUP_FAILED', err})
        })


    }
}