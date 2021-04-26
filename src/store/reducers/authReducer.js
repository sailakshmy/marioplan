const initState={
    authError : null
}
const authReducer = (state= initState,action) =>{
    switch(action.type){

        case 'LOGIN_FAILED':
            console.log('Login Failed');
            return {
                ...state, 
                authError: 'Login failed'
            }

        case 'LOGIN_SUCCESS':
            console.log('Login successful');
            return {
                ...state,
                authError: null
            }

        case 'SIGNOUT_SUCCESS':
            console.log('Signout successful');
            return state;

        case 'SIGNUP_SUCCESS':
            console.log('Sign up Successful');
            return{
                ...state,
                authError: null
            }
        
        case 'SIGNUP_FAILED':
            console.log('Sign up failed');
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
            
    }
}

export default authReducer;