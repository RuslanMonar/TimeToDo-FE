import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Option,
    Select,
    Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaFlag } from "react-icons/fa6";
import { RiTimerFill } from "react-icons/ri";

const CreateTaskModal = ({ handleOpen, openModal }) => {
    const [title, setTilte] = useState("");
    const [tomatoCount, setTomatoCount] = useState(0);
    const [tomatoLength, setTomatoLength] = useState(25);

    return (
        <Dialog
            open={openModal}
            size={"xs"}
            handler={handleOpen}
        >
            <DialogHeader>Create Task</DialogHeader>


            <DialogBody className="flex">

                <div className="flex flex-between  min-w-full justify-around flex-col">
                    <div className="mb-[20px]">
                        <Input
                            label="Title"
                            value={title}
                            onChange={({ target }) => setTilte(target.value)}
                        />
                    </div>


                    <div>
                        <Select label="Select Priority">
                            <Option>
                                <div className="flex">
                                    <FaFlag className="mr-4" color="red" />
                                    <sapn>High</sapn>
                                </div>
                            </Option>
                            <Option>
                                <div className="flex">
                                    <FaFlag className="mr-4" color="#F3E626" />
                                    <sapn>Medium</sapn>
                                </div>
                            </Option>
                            <Option>
                                <div className="flex">
                                    <FaFlag className="mr-4" color="green" />
                                    <sapn>Low</sapn>
                                </div>
                            </Option>
                            <Option>
                                <div className="flex">
                                    <FaFlag className="mr-4" color="gray" />
                                    <sapn>None</sapn>
                                </div>
                            </Option>
                        </Select>
                    </div>



                    <div className="w-100 mt-6">
                        <div className="flex">
                            <div className="relative w-full mr-4">
                                <div
                                    className="absolute left-2.5 top-2.5 h-5 w-5 text-slate-600"
                                >
                                    <RiTimerFill size={18} color="#64b9f6" />
                                </div>
                                <Input
                                    label="Iterations"
                                    type="number"
                                    value={tomatoCount}
                                    onChange={(e) => setValue(Number(e.target.value))}
                                    className=" pl-10 placeholder:text-blue-gray-300 placeholder:opacity-100   appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    containerProps={{
                                        className: "min-w-0",
                                    }}
                                />
                                <div className="absolute right-1 top-1 flex gap-0.5">
                                    <IconButton
                                        size="sm"
                                        variant="text"
                                        className="rounded"
                                        onClick={() => setTomatoCount((cur) => (cur === 0 ? 0 : cur - 1))}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                                        </svg>
                                    </IconButton>
                                    <IconButton
                                        size="sm"
                                        variant="text"
                                        className="rounded"
                                        onClick={() => setTomatoCount((cur) => cur + 1)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                        </svg>
                                    </IconButton>
                                </div>
                            </div>
                            <Input
                                defaultValue={25}
                                value={tomatoLength}
                                onChange={(e) => setTomatoLength(Number(e.target.value))}
                                type="number"
                                inputMode="numeric"
                                label="Iteration lenght"
                                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                        </div>

                    </div>




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
                    onClick={() => { handleOpen(false) }}
                >
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );

}

export default CreateTaskModal;