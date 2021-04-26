//import {reactReduxFirebase} from 'react-redux-firebase'; 


export const createProject = (project)=>{/**Here we take in the newly created project details and return
    another function */
    return (dispatch, getState, {getFirebase, getFirestore}) =>{ /**Here we take in the dispatch and
        the state of the store as well as the 
        At some point, we can take the project and add it to a db and then dispatch the actual action
        after the Async call has been completed
         */
        //make async call to DB over here
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('projects').add({
            ...project,
            authorFirstName : profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then (()=>{
            dispatch({type:'CREATE_PROJECT', project: project});
        }).catch((e)=> {
            dispatch({type:'CREATE_PROJECT_ERROR', e})
        })
        
    }
};