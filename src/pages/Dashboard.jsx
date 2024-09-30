import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { MdAddTask } from "react-icons/md";
import { DashboardSidebar } from "../components/DashboardSidebar";
import CreateTaskModal from "../components/Task/CreateTaskModal";
import EditTask from "../components/Task/EditTask";
import Task from "../components/Task/Task";
import tasksGateway from "../gateways/tasksGateway";
import useStore from "../store";

const Dashboard = () => {
    const [openCreateTask, setOpenCreateTask] = useState(false);
    const [tasks, setTasks] = useState([]);
    const handleOpenCreateTask = (value) => setOpenCreateTask(value);
    const { activeProject } = useStore();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await tasksGateway.getTasks(activeProject);
            setTasks(data);
        }

        fetchData().catch(console.error);
    }, [activeProject]);

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <DashboardSidebar />
            
            <main className="bg-slate-100" style={{ padding: 10, width: "100%" }}>
                <div className="flex justify-center pt-12 flex-col items-center">
                    <Button
                        style={{ backgroundColor: "black", color: "#64b9f6", borderColor: "#64b9f6" }}
                        className="flex items-center gap-3 justify-center w-[30%] text-base border-4"
                        onClick={() => handleOpenCreateTask(true)}
                    >
                        <MdAddTask size={32} />
                        Add New Task
                    </Button>
                    {
                        tasks.map(task => (
                            <Task key={task.id} task={task} />
                        ))
                    }

                </div>
                <CreateTaskModal openModal={openCreateTask} handleOpen={handleOpenCreateTask} />

            </main>
            <EditTask />
        </div>
    );

}

export default Dashboard;