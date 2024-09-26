import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import { FaFolder, FaTasks } from "react-icons/fa";
import { useState, useEffect } from 'react';
import foldersGateway from '../gateways/foldersGateway';
import projectsGateway from '../gateways/projectsGateway';
import ProjectItem from './ProjectItem';

export const DashboardSidebar = () => {
    const [folders, setFolders] = useState([]);
    const [projects, setProjects] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await foldersGateway.getFolders();
            setFolders(data);
        }

        fetchData().catch(console.error);
    }, []);

    const fetchProjects = async (folderId) => {
        if (projects[folderId]) {
            return;
        }

        const { data } = await projectsGateway.getProjects(folderId);

        if (data) {
            setProjects(prev => ({ ...prev, [folderId]: data }));
        }
    }

    return (
        <Sidebar rootStyles={{
            [`.${sidebarClasses.container}`]: {
                backgroundColor: 'white',
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
                                backgroundColor: active ? '#fdaeae' : "white",
                            };
                    },
                }}
            >
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
                                    <MenuItem>Loading...</MenuItem>
                                )
                            }
                        </SubMenu>
                    ))
                }

            </Menu>
        </Sidebar>
    );
}
