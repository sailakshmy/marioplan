import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import {signOut} from '../../store/actions/authActions';

const SignedInLinks = (props) => {/**This is functional component, so we have to take the props as 
    a parameter, unlike the other components where we were directly accessing the this.props inside the 
    component. We will attach an onClick event to the log out button. Remove the Nav Link tag from 
    that and make it an anchor tag. This we are doing, because we don't have to navigate to anywhere else*/
    
    return(
        <ul className="right">
            <li><NavLink to = '/create'>New Project </NavLink></li>
            <li><a onClick= {props.signOut}>Log Out</a></li>
    <li><NavLink to = '/' className='btn btn-floating pink lighten-1'>{props.profile.initials}</NavLink></li>
        </ul>
    )
}
const mapDispatchToProps= (dispatch)=>{
    return{
        signOut: ()=> dispatch(signOut()) 
    }
}

export default connect(null,mapDispatchToProps)(SignedInLinks);