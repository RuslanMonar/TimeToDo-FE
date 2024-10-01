import { api } from "../config/httpClients/axios";

const getTasks = async (folderId = null, taskId = null) => {
    var params = {
      params: {
        projectId: folderId,
        taskId:taskId
      }
    }
  

  return await api().get("Tasks/", params);
};

const createTask = async (title, priority, tomatoCount, tomatoLenght, projectId, startDate, endDate, description) => {
  return await api().post("Tasks/", { title, priority, tomatoCount, tomatoLenght, projectId, startDate, endDate, description });
};


const updateTask = async (taskId, title, priority, tomatoCount, tomatoLenght, projectId, startDate, endDate, description) => {
  return await api().put("Tasks/", { taskId, title, priority, tomatoCount, tomatoLenght, projectId, startDate, endDate, description });
};

const createTaskSession = async (taskId, sessionId, startDate, timerStart, timerPause, timerEnd, sessionDurationMinutes, isFullItteration) => {
  console.log({ taskId, sessionId, startDate, timerStart, timerPause, timerEnd, sessionDurationMinutes, isFullItteration })
  return await api().post("Tasks/CreateTaskSession", { taskId, sessionId, startDate, timerStart, timerPause, timerEnd, sessionDurationMinutes, isFullItteration });
};

export default {
  updateTask,
  getTasks,
  createTask,
  createTaskSession
};