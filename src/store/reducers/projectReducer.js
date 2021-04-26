const initState={
    projects:[
        {id:'1',title:'title1',content:'content1'},
        {id:'2',title:'title2',content:'content2'},
        {id:'3',title:'title3',content:'content3'}
        
    ]

}
const projectReducer = (state= initState,action) =>{
    switch(action.type){
        case 'CREATE_PROJECT':
            console.log('Created project ', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('Running into error ', action.e);
            return state;
        default: 
            return state;
         
    }
    
}

export default projectReducer;