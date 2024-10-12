import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { MdAddTask } from "react-icons/md";
import { DashboardSidebar } from "../components/DashboardSidebar";
import CreateTaskModal from "../components/Task/CreateTaskModal";
import EditTaskSidebar from "../components/Task/EditTaskSidebar";
import Task from "../components/Task/Task";
import TaskWorkingSessionModal from "../components/Task/TaskWorkingSessionModal";
import tasksGateway from "../gateways/tasksGateway";
import useStore from "../store";

const Dashboard = () => {
    const [openCreateTask, setOpenCreateTask] = useState(false);
    const [editTaskCollapsed, setEditTaskCollapsed] = useState(true);
    const [editTaskId, setEditTaskId] = useState(false);
    const [editTaskInfo, setEditTaskInfo] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [openWorkingSession, setOpenWorkingSession] = useState(false);
    const handleOpenWorkingSession = () => setOpenWorkingSession(!openWorkingSession);
    const handleOpenCreateTask = (value) => setOpenCreateTask(value);
    const { activeProject, showCompleted } = useStore();

    useEffect(() => {
        reloadTaskList().catch(console.error);
    }, [activeProject, showCompleted]);

    const reloadTaskList = async () => {
        const { data } = await tasksGateway.getTasks(activeProject, null, showCompleted);
        setTasks(data);
        setEditTaskCollapsed(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await tasksGateway.getTasks(activeProject, editTaskId);
            if (!!data) {
                setEditTaskInfo(data[0]);
            }
        }

        fetchData().catch(console.error);
    }, [editTaskId]);

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
                            <Task
                                setEditTaskCollapsed={setEditTaskCollapsed}
                                handleOpenWorkingSession={handleOpenWorkingSession}
                                setEditTaskId={setEditTaskId}
                                key={task.id}
                                task={task}
                                reloadTaskList={reloadTaskList}
                            />
                        ))
                    }
                </div>

                <CreateTaskModal openModal={openCreateTask} handleOpen={handleOpenCreateTask} />
                <TaskWorkingSessionModal open={openWorkingSession} handleOpen={handleOpenWorkingSession} task={editTaskInfo}/>
            </main>
            <EditTaskSidebar task={editTaskInfo} collapsed={editTaskCollapsed} setEditTaskCollapsed={setEditTaskCollapsed} reloadTaskList={reloadTaskList} />
        </div>
    );

}

export default Dashboard;