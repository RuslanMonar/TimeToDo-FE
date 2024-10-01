import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { FaFlag, FaPause } from "react-icons/fa6";
import { GrResume } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import { useTimer } from 'react-timer-hook';

const TaskWorkingSessionModal = ({ open, handleOpen, task }) => {

    function minutesToSeconds(minutes) {
        console.log(minutes * 60)
        return minutes * 60;
    }

    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp: new Date(), onExpire: () => console.warn('onExpire called') });

    useEffect(() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + minutesToSeconds(task.tomatoLenght));
        restart(time);
        pause();
    }, [handleOpen])

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
        <div>
            <Dialog style={{ height: "-webkit-fill-available", justifyContent: "center" }} className="flex items-center" size="xxl" open={open} handler={handleOpen}>
                <DialogHeader>

                    <div className="rounded-md mt-5" style={{
                        display: 'flex', height: '40px', width: '100%', justifyContent: "center", alignItems: "center"
                    }}>
                        <div className="flex items-center justify-center w-[200px]">
                            {task.title}
                            <FaFlag className="ml-4" color={getPriorityColor(task.priority)} />
                        </div>
                    </div>


                </DialogHeader>
                <DialogBody style={{ height: "-webkit-fill-available" }}>
                    <div className="" style={{ textAlign: 'center' }}>
                        <div className="flex items-center justify-center" style={{ fontSize: '100px', width: "100%", borderColor: "#64b9f6" }}>
                            <div
                                className="border-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "black", color: "#64b9f6", width: "200px", height: "200px", borderColor: "#64b9f6" }}>
                                {days}
                            </div>
                            <span style={{ color: "black" }}>:</span>
                            <div
                                className="border-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "black", color: "#64b9f6", width: "200px", height: "200px", borderColor: "#64b9f6" }}>
                                {hours}
                            </div>
                            <span style={{ color: "black" }}>:</span>
                            <div
                                className="border-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "black", color: "#64b9f6", width: "200px", height: "200px", borderColor: "#64b9f6" }}>
                                {minutes}
                            </div>
                            <span style={{ color: "black" }}>:</span>
                            <div
                                className="border-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "black", color: "#64b9f6", width: "200px", height: "200px", borderColor: "#64b9f6" }}>
                                {seconds}
                            </div>
                        </div>
                        <p className="mb-4">{isRunning ? 'Running' : 'Not running'}</p>
                        <Button
                            variant="filled"
                            className="mr-4 border-4"
                            style={{ backgroundColor: "black", color: "#64b9f6", borderColor: "#64b9f6" }}
                            onClick={start}>
                            <div className="flex items-center">
                                Start
                                <MdOutlinePlayCircleOutline size={22} className="ml-2" />
                            </div>

                        </Button>
                        <Button
                            variant="filled"
                            className="mr-4 border-4"
                            style={{ backgroundColor: "black", color: "#fdaeae", borderColor: "#fdaeae" }}
                            onClick={pause}>
                            <div className="flex items-center">
                                Pause
                                <FaPause size={22} className="ml-2" />
                            </div>

                        </Button>
                        <Button
                            variant="filled"
                            className="mr-4 border-4"
                            style={{ backgroundColor: "black", color: "#ffa02f", borderColor: "#ffa02f" }}
                            onClick={resume}>
                            <div className="flex items-center">
                                Resume
                                <GrResume size={22} className="ml-2" />
                            </div>
                        </Button>
                        <Button
                            variant="filled"
                            className="mr-4 border-4"
                            style={{ backgroundColor: "black", color: "#F3E626", borderColor: "#F3E626" }}
                            onClick={() => {
                                // Restarts to 5 minutes timer
                                const time = new Date();
                                time.setSeconds(time.getSeconds() + minutesToSeconds(task.tomatoLenght));
                                restart(time)
                            }}>
                            <div className="flex items-center">
                                Restart
                                <VscDebugRestart size={22} className="ml-2" />
                            </div>
                        </Button>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <IoMdCloseCircleOutline className="cursor-pointer" onClick={handleOpen} size={75} color="black" />
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default TaskWorkingSessionModal;