import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Option,
    Select
} from "@material-tailwind/react";
import { Chrome } from '@uiw/react-color';
import { useState } from "react";
import projectsGateway from "../gateways/projectsGateway";
import useStore from "../store";

const CreateProjectModal = ({ handleOpen, openModal, fetchProjects }) => {
    const [title, setTilte] = useState("");
    const [color, setColor] = useState("#F1C909");
    const [folderId, setFolderId] = useState();
    const { folders } = useStore();

    const createProject = async () => {
        await projectsGateway.createFolder(title, color, folderId);
        fetchProjects(parseInt(folderId));
    }

    return (
        <Dialog
            open={openModal}
            size={"xs"}
            handler={handleOpen}
        >
            <DialogHeader>Create Project</DialogHeader>
            <DialogBody className="flex">
                <div className="flex flex-between  min-w-full justify-around flex-col">
                    <div className="mb-[20px]">
                        <Input
                            label="Title"
                            value={title}
                            onChange={({ target }) => setTilte(target.value)}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <Select
                            label="Select Folder"
                            value={folderId}
                            onChange={(val) => {setFolderId(val)}}
                        >
                            {
                                folders.map(folder => (
                                    <Option key={folder.id} value={folder.id.toString()}>{folder.title}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <span className="mb-[20px]" style={{ color: "black" }}>Project color</span>
                    <Chrome
                        style={{ width: "100% !important" }}
                        color={color}
                        onChange={(color) => {
                            setColor(color.hex);
                        }}
                    />
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    style={{ backgroundColor: "black", color: "#fdaeae" }}
                    variant="filled"
                    onClick={() => handleOpen(false)}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button style={{ backgroundColor: "black", color: "#64b9f6" }}
                    variant="filled"
                    onClick={() => { createProject(); handleOpen(false) }}
                >
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default CreateProjectModal;