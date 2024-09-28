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
    Textarea
} from "@material-tailwind/react";
import { addDays } from 'date-fns';
import { useEffect, useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaFlag } from "react-icons/fa6";
import { RiTimerFill } from "react-icons/ri";
import projectsGateway from "../../gateways/projectsGateway";
import tasksGateway from "../../gateways/tasksGateway";

const CreateTaskModal = ({ handleOpen, openModal }) => {
    const [title, setTilte] = useState("");
    const [tomatoCount, setTomatoCount] = useState(0);
    const [priority, setPriority] = useState(3);
    const [tomatoLength, setTomatoLength] = useState(25);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [description, setDescription] = useState("");

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await projectsGateway.getProjects();
            setProjects(data);
        }

        fetchData().catch(console.error);
    }, []);

    const createTask = async () => {
        await tasksGateway.createTask(
            title,
            parseInt(priority),
            tomatoCount,
            tomatoLength,
            parseInt(selectedProject),
            date.at(0).startDate,
            date.at(0).endDate,
            description
        );
    }

    return (
        <Dialog
            open={openModal}
            size={"md"}
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


                    <div className="flex">
                        <div className="w-[100%] mr-4">
                            <Select
                                value={priority}
                                onChange={(val) => { setPriority(val) }}
                                label="Select Priority">
                                <Option value={"0"}>
                                    <div className="flex">
                                        <FaFlag className="mr-4" color="red" />
                                        <span>High</span>
                                    </div>
                                </Option>
                                <Option value={"1"}>
                                    <div className="flex">
                                        <FaFlag className="mr-4" color="#F3E626" />
                                        <span>Medium</span>
                                    </div>
                                </Option>
                                <Option value={"2"}>
                                    <div className="flex">
                                        <FaFlag className="mr-4" color="green" />
                                        <span>Low</span>
                                    </div>
                                </Option>
                                <Option value={"3"}>
                                    <div className="flex">
                                        <FaFlag className="mr-4" color="gray" />
                                        <span>None</span>
                                    </div>
                                </Option>
                            </Select>
                        </div>

                        <Select
                            value={selectedProject}
                            onChange={(val) => { setSelectedProject(val) }}
                            label="Select Project">
                            {
                                projects.map(project => (
                                    <Option value={project.id.toString()}>
                                        <div className="flex">
                                            <div className='rounded-full w-[10px] h-[10px] mr-4 ml-4 mt-1' style={{ backgroundColor: project.color }}></div>
                                            <span>{project.title}</span>
                                        </div>
                                    </Option>
                                ))
                            }

                        </Select>
                    </div>



                    <div className="w-100 mt-6">
                        <div className="flex">
                            <div className="relative w-full mr-4">
                                <div className="absolute left-2.5 top-2.5 h-5 w-5 text-slate-600">
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
                                value={tomatoLength}
                                onChange={(e) => setTomatoLength(Number(e.target.value))}
                                type="number"
                                inputMode="numeric"
                                label="Iteration lenght"
                                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                        </div>

                    </div>


                    <DateRangePicker
                        className="mt-10 mb-10"
                        onChange={item => { setDate([item.selection]); console.log([item.selection]) }}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={date}
                        direction="horizontal"
                        preventSnapRefocus={true}
                        calendarFocus="forwards"
                    />

                    <div>
                        <Textarea value={description} onChange={x => setDescription(x.target.value)} label="Description" />
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
                    onClick={() => {createTask(); handleOpen(false) }}
                >
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );

}

export default CreateTaskModal;