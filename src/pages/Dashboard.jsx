import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { MdAddTask } from "react-icons/md";
import { DashboardSidebar } from "../components/DashboardSidebar";
import CreateTaskModal from "../components/Task/CreateTaskModal";

const Dashboard = () => {
    const [openCreateTask, setOpenCreateTask] = useState(false);
    const handleOpenCreateTask = (value) => setOpenCreateTask(value);


    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <DashboardSidebar />
            <main className="bg-slate-100" style={{ padding: 10, width: "100%" }}>
                <div className="flex justify-center pt-12">
                    <Button
                        style={{ backgroundColor: "black", color: "#64b9f6", borderColor: "#64b9f6" }}
                        className="flex items-center gap-3 justify-center w-[30%] text-base border-4"
                        onClick={() => handleOpenCreateTask(true)}
                    >
                        <MdAddTask size={32} />
                        Add New Task
                    </Button>
                </div>
                <CreateTaskModal openModal={openCreateTask} handleOpen={handleOpenCreateTask} />
            </main>
        </div>
    );

}

export default Dashboard;