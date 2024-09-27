import {
    Button,
    ButtonGroup
} from "@material-tailwind/react";
import { useState } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import CreateFolderModal from "./CreateFolderModal";

const SidebarFooter = () => {
    const [openCreateFolderModal, setCreateFolderModal] = useState(false);
    const handleOpen = (value) => setCreateFolderModal(value);

    return (
        <>
            <div className="mt-auto p-4 border-t border-gray-400 flex justify-around absolute bottom-0 w-full">
                <ButtonGroup variant="text">
                    <Button onClick={() => handleOpen(true)} className="flex items-center gap-2" style={{ color: "black", borderColor: "black" }}> <FaFolderPlus size={32} />Create Folder</Button>
                    <Button className="flex items-center gap-2" style={{ color: "black", borderColor: "black" }}> <IoIosAddCircle size={32} />Create Project</Button>
                </ButtonGroup>
            </div>
            <CreateFolderModal openModal={openCreateFolderModal} handleOpen={handleOpen} />
        </>
    );
}

export default SidebarFooter;