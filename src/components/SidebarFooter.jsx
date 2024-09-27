import {
    Button,
    ButtonGroup
} from "@material-tailwind/react";
import { useState } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import CreateFolderModal from "./CreateFolderModal";
import CreateProjectModal from "./CreateProjectModal";

const SidebarFooter = ({ fetchProjects }) => {
    const [openCreateFolderModal, setCreateFolderModal] = useState(false);
    const [openCreateProjectModal, setreateProjectModal] = useState(false);
    const handleFolderCreateModalOpen = (value) => setCreateFolderModal(value);
    const handleProjectCreateModalOpen = (value) => setreateProjectModal(value);

    return (
        <>
            <div className="mt-auto p-4 border-t border-gray-400 flex justify-around absolute bottom-0 w-full">
                <ButtonGroup variant="text">
                    <Button onClick={() => handleFolderCreateModalOpen(true)} className="flex items-center gap-2" style={{ color: "black", borderColor: "black" }}> <FaFolderPlus size={32} />Create Folder</Button>
                    <Button onClick={() => handleProjectCreateModalOpen(true)} className="flex items-center gap-2" style={{ color: "black", borderColor: "black" }}> <IoIosAddCircle size={32} />Create Project</Button>
                </ButtonGroup>
            </div>
            <CreateFolderModal openModal={openCreateFolderModal} handleOpen={handleFolderCreateModalOpen} />
            <CreateProjectModal fetchProjects={fetchProjects} openModal={openCreateProjectModal} handleOpen={handleProjectCreateModalOpen} />
        </>
    );
}

export default SidebarFooter;