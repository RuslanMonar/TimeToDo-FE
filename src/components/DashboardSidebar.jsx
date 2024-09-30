import { useEffect, useState } from 'react';
import { FaFolder, FaTasks } from "react-icons/fa";
import { Menu, MenuItem, Sidebar, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import foldersGateway from '../gateways/foldersGateway';
import projectsGateway from '../gateways/projectsGateway';
import useStore from '../store';
import ProjectItem from './ProjectItem';
import SidebarFooter from './SidebarFooter';

export const DashboardSidebar = () => {
    const [projects, setProjects] = useState({});
    const { folders, setFolders } = useStore();
    const { setActiveProject } = useStore();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await foldersGateway.getFolders();
            setFolders(data);
        }

        fetchData().catch(console.error);
    }, []);

    const fetchProjects = async (folderId) => {
        const { data } = await projectsGateway.getProjects(folderId);

        if (data) {
            setProjects(prev => ({ ...prev, [folderId]: data }));
        }
    }

    return (
        <Sidebar width="300px" rootStyles={{
            [`.${sidebarClasses.container}`]: {
                backgroundColor: 'white'
            },
        }}>
            <Menu
                className='bg-white'
                menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        // only apply styles on first level elements of the tree
                        if (level === 0)
                            return {
                                color: disabled ? '' : 'black',
                                backgroundColor: active ? '#EDEDED' : "white",
                            };
                    },
                }}
            >
                <MenuItem onClick={() => setActiveProject(null)} active>
                    <div className='flex items-center'>
                        <FaTasks style={{ minWidth: "25px", height: "25px", backgroundColor: "#64b9f6", padding: "5px" }} color='white' className='ml-[7px] mr-[13px]' />
                        All tasks
                    </div>
                </MenuItem>
                
                {
                    folders.map(folder => (
                        <SubMenu
                            key={folder.id}
                            label={folder.title}
                            icon={<FaFolder color={folder.color} />}
                            onClick={() => fetchProjects(folder.id)}
                        >
                            {
                                projects[folder.id] ? (
                                    projects[folder.id].map(project => (
                                        <MenuItem key={project.id}>
                                            <ProjectItem key={project.id} project={project} folderColor={folder.color} />
                                        </MenuItem>
                                    ))
                                ) : (
                                    <></>
                                )
                            }
                        </SubMenu>
                    ))
                }
                <SidebarFooter fetchProjects={fetchProjects} />
            </Menu>
        </Sidebar>
    );
}
