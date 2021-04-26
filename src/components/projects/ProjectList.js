import React from 'react';
import ProjectSummary from './ProjectSummary';
import {Link} from 'react-router-dom';

const ProjectList = (props)=>{
    //console.log(props);
    const {projects} = props;
    return(
        <div className="project-list section">
            { projects && projects.map(project =>{ /**We first check if projects property exists or not */
                return(
                    <Link  to={'/projects/' + project.id}  key={project.id} >
                        <ProjectSummary project={project} />
                    </Link>
                )
            })}  
        </div>
    )
}

export default ProjectList;