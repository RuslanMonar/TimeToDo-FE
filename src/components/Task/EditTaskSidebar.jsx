import {
    Button,
    IconButton,
    Input,
    Option,
    Select,
    Textarea
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaFlag } from "react-icons/fa6";
import { RiTimerFill } from "react-icons/ri";
import projectsGateway from "../../gateways/projectsGateway";
import tasksGateway from "../../gateways/tasksGateway";

import { Sidebar, sidebarClasses } from 'react-pro-sidebar';
import useStore from "../../store";

const EditTaskSidebar = ({ task, collapsed, setEditTaskCollapsed, reloadTaskList }) => {
    const [title, setTilte] = useState(task?.title);
    const [tomatoCount, setTomatoCount] = useState(task?.tomatoCount);
    const [priority, setPriority] = useState(task?.priority);
    const [tomatoLength, setTomatoLength] = useState(task?.tomatoLength);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(task?.projectId?.toString());
    const [description, setDescription] = useState(task?.description);
    const [date, setDate] = useState([]);
    const { setActiveProject } = useStore();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await projectsGateway.getProjects();
            setProjects(data);

            if (task) {
                console.log(task.projectId?.toString())
                setTilte(task.title || "");
                setTomatoCount(task.tomatoCount || 0);
                setPriority(task.priority || 0);
                setTomatoLength(task.tomatoLenght || 0);
                setSelectedProject(task.projectId?.toString() || "");
                setDescription(task.description || "");
                setDate([{
                    startDate: task.startDate,
                    endDate: task.endDate,
                    key: 'selection'
                }] || [])
                
            }
        }

        fetchData().catch(console.error);
    }, [task]);


    const updateTask = async () => {
        var taskId = task.id;
        await tasksGateway.updateTask(
            taskId,
            title,
            parseInt(priority),
            tomatoCount,
            tomatoLength,
            parseInt(selectedProject),
            date.at(0).startDate,
            date.at(0).endDate,
            description
        );
        
        reloadTaskList();
    }


    return (
        <div
            style={{
                display: 'flex',
                height: '100%',
                minHeight: '400px',
            }}
        >
            <Sidebar collapsed={collapsed} width="500px" collapsedWidth="0px" rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: 'white',
                    padding: collapsed ? "0px" : "30px"
                },
            }}>
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
                                value={priority?.toString()}
                                onChange={(val) => { setPriority(val) }}
                                label="Select Priority">
                                <Option key={0} value={"0"}>
                                    <div className="flex">
                                        <FaFlag className="mr-4" color="red" />
                                        <span>High</span>
                                    </div>
                                </Option>
                                <Option key={1} value={"1"}>
                                    <div className="flex">
                                        <FaFlag className="mr-4" color="#F3E626" />
                                        <span>Medium</span>
                                    </div>
                                </Option>
                                <Option key={2} value={"2"}>
                                    <div className="flex">
                                        <FaFlag className="mr-4" color="green" />
                                        <span>Low</span>
                                    </div>
                                </Option>
                                <Option key={3} value={"3"}>
                                    <div className="flex">
                                        <FaFlag className="mr-4" color="gray" />
                                        <span>None</span>
                                    </div>
                                </Option>
                            </Select>
                        </div>

                        {
                            projects?.length > 0 ? (
                                <Select
                                    value={selectedProject?.toString()}
                                    onChange={(val) => { setSelectedProject(val) }}
                                    label="Select Project">
                                    {
                                        projects.map(project => (
                                            <Option key={project.id} value={project.id.toString()}>
                                                <div className="flex">
                                                    <div className='rounded-full w-[10px] h-[10px] mr-4 ml-4 mt-1' style={{ backgroundColor: project.color }}></div>
                                                    <span>{project.title}</span>
                                                </div>
                                            </Option>
                                        ))
                                    }

                                </Select>
                            ) : (<></>)
                        }
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
                        onChange={item => { setDate([item.selection]) }}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={date}
                        direction="horizontal"
                        preventSnapRefocus={true}
                        focusedRange={[0, 0]}
                        calendarFocus="forwards"
                    />

                    <div>
                        <Textarea value={description} onChange={x => setDescription(x.target.value)} label="Description" />
                    </div>

                </div>
                <div className="flex justify-end mb-5 cursor-pointer mt-16  ">
                    <Button
                        style={{ backgroundColor: "black", color: "#fdaeae" }}
                        variant="filled"
                        onClick={() => setEditTaskCollapsed(true)}
                        className="mr-1"
                    >
                        <span>Close</span>
                    </Button>
                    <Button style={{ backgroundColor: "black", color: "#64b9f6" }}
                        variant="filled"
                        onClick={() => { updateTask(); }}
                    >
                        <span>Save Changes</span>
                    </Button>
                </div>
            </Sidebar>
        </div>
    )
}

export default EditTaskSidebar;