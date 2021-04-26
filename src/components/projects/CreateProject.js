import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createProject} from '../../store/actions/projectActions';
import {Redirect} from'react-router-dom';

class CreateProject extends Component {
    state = {
        title:'',
        content:''
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        //console.log(this.state);
        this.props.createProject(this.state);/**Since we have mapped the dispatch function to the props,
        we have access to the createProject function. We pass the this.state to this function. this.state
        has the details of the newly created project. Now, we pass this to the createProject function */
        this.props.history.push('/'); /*This is to redirect the user to the dashboard after a project has
        been created successfully */

    }
  render() {
      const { auth } = this.props;
      if( !auth.uid )
        return <Redirect to ='/signin'/>
    return (
      <div className = 'container'>
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Create Project</h5>
            <div className="input-field">
                <label htmlFor="title">Project Title</label>
                <input type="text" id='title' onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="content">Project Description</label>
                <textarea  id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            </div> 
            <div className="input-field">
                <button className="btn pink lighten-1 z-depth-0">Create Project</button>
            </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
    return{
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        createProject: (project) => dispatch(createProject(project)) /**Here we get the newly created
        project details and we dispatch the details to the createProject action creator. */
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateProject);/*The first parameter to the connect Function
should always be mapStateToProps. Since we don't have that here, we use mapDispatchToProps */
