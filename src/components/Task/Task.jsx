import { Checkbox } from "@material-tailwind/react";
import { IoPlayCircle } from "react-icons/io5";
import { RiTimerFill } from "react-icons/ri";
import tasksGateway from "../../gateways/tasksGateway";

const Task = ({ task, setEditTaskCollapsed, handleOpenWorkingSession, setEditTaskId, reloadTaskList }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleCheckboxChange = async (event) => {
        const newStatus = event.target.checked; // Новий статус чекбокса
        const dateCompleted = newStatus == true ? new Date() : null
        try {
            await tasksGateway.markTaskCompleted(task.id, newStatus, dateCompleted)
            await reloadTaskList();
            // Тут можна оновити локальний стан задачі, якщо потрібно
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const getPriorityColor = (priority, isYellow) => {
        if (priority == 0) {
            return "red"
        }
        if (priority == 1) {
            if (isYellow) {
                return "yellow"
            }
            return "#F3E626"
        }
        if (priority == 2) {
            return "green"
        }
        if (priority == 3) {
            return "gray"
        }
    };

    return (
        <div className="rounded-md mt-5" style={{
            display: 'flex', height: '40px', backgroundColor: "white", width: '70%', border: "1px solid", borderWidth: "0px 4px 0px 4px",
            borderColor: getPriorityColor(task.priority), justifyContent: "space-between", alignItems: "center"
        }}>
            <div className="flex items-center">
                <Checkbox
                    defaultChecked={task.isCompleted}
                    onChange={handleCheckboxChange}
                    color={getPriorityColor(task.priority, true)}
                    className="transition-all hover:scale-100 hover:before:opacity-0" style={{
                        borderColor: getPriorityColor(task.priority),
                        borderWidth: "2px 2px 2px 2px"
                    }} />
                <IoPlayCircle onClick={() => handleOpenWorkingSession()} size={24} color="#64b9f6" className="mr-3" />
                <span className="cursor-pointer" onClick={() => { setEditTaskCollapsed(false); setEditTaskId(task.id) }}>{task.title}</span>
            </div>
            <div className="flex justify-between w-[25%]">
                <div className="flex items-center">
                    <span className="mr-2">{task.tomatoCompleted}/{task.tomatoCount}</span>
                    <RiTimerFill color="red" />
                </div>
                <span className="mr-6" style={{ color: "gray" }}>
                    {formatDate(task.endDate)}
                </span>
            </div>
        </div>
    );

}

export default Task;