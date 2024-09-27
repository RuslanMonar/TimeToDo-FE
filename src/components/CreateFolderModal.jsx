import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input
} from "@material-tailwind/react";
import { Chrome } from '@uiw/react-color';
import { useState } from "react";
import foldersGateway from "../gateways/foldersGateway";
import useStore from "../store";

const CreateFolderModal = ({ handleOpen, openModal }) => {
    const [title, setTilte] = useState("");
    const [color, setColor] = useState("#F1C909");
    const { setFolders } = useStore();

    const createFolder = async () => {
        await foldersGateway.createFolder(title,color);

        var {data} = await foldersGateway.getFolders();
        setFolders(data)
    }

    return (
        <Dialog
            open={openModal}
            size={"xs"}
            handler={handleOpen}
        >
            <DialogHeader>Create Folder</DialogHeader>
            <DialogBody className="flex">
                <div className="flex flex-between  min-w-full justify-around flex-col">
                    <div className="mb-[20px]">
                        <Input
                            label="Title"
                            value={title}
                            onChange={({ target }) => setTilte(target.value)}
                        />
                    </div>
                    <span className="mb-[20px]" style={{ color: "black" }}>Folder color</span>
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
                    onClick={() => {createFolder(); handleOpen(false)}}
                >
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default CreateFolderModal;