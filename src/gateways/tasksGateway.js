import { api } from "../config/httpClients/axios";


const createTask = async (title, priority, tomatoCount, tomatoLenght, projectId, startDate, endDate, description) => {
  return await api().post("Tasks/", { title, priority, tomatoCount, tomatoLenght, projectId, startDate, endDate, description });
};

export default {
    createTask
};