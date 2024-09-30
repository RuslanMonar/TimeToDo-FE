import { api } from "../config/httpClients/axios";

const getTasks = async (folderId) => {
  var params = {}

  if (folderId != null) {
    params = {
      params: {
        projectId: folderId
      }
    }
  }

  return await api().get("Tasks/", params);
};

const createTask = async (title, priority, tomatoCount, tomatoLenght, projectId, startDate, endDate, description) => {
  return await api().post("Tasks/", { title, priority, tomatoCount, tomatoLenght, projectId, startDate, endDate, description });
};

export default {
  getTasks,
  createTask
};