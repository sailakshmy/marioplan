import React, {Component} from 'react';
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';


class Dashboard extends Component{
    render(){
        //console.log(this.props);
        const {projects, auth, notifications} = this.props;
        if(!auth.uid) 
            return <Redirect to='/signin' />
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    //console.log(state);
    return{
        /* This is before the firestore DB was connected
        projects: state.project.projects /*This will access the state of the rootReducer which has a 
        property project. This project property inturn points to the projects property of the projectReducer 
        */
       //After the firestore DB is connected
       projects: state.firestore.ordered.projects, /**This will access the state of the rootReducer, which
       has a property firestore. This firestore property points to the firestoreReducer.(This firestoreReducer 
       will automatically sync up the with the data in the DB). In the firestore property, we have an ordered
       property, which is an object with the property projects. We pass this to our property projects, which
       will be passed as props to the ProjectList component*/
       auth : state.firebase.auth,
       notifications: state.firestore.ordered.notifications
  }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'projects', orderBy: ['createdAt','desc']},
        {collection: 'notifications', limit : 3,orderBy: ['time','desc']}
    ])
)(Dashboard);