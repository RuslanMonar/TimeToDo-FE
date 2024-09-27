// ProjectItem.js
import { MenuItem } from 'react-pro-sidebar';

const ProjectItem = ({ project, folderColor }) => {
    return (
        <MenuItem key={project.id} style={{ paddingLeft: '0px', borderLeft: `2px solid ${folderColor}` }}>
            <div className='flex flex-row items-center' >
                <div className='rounded-full w-[10px] h-[10px] mr-4 ml-4' style={{ backgroundColor: project.color }}></div>
                {project.title}
            </div>
        </MenuItem>
    );
}

export default ProjectItem;