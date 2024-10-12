import { api } from "../config/httpClients/axios";

const getProjects = async (folderId) => {
  return await api().get("Projects/", {
    params: {
      folderId: folderId
    }
  });
};

const GetProjectsSatistic = async () => {
  return await api().get("Projects/GetProjectsSatistic", {});
};

const GetProjectsTimeline = async () => {
  return await api().get("Projects/GetProjectsTimeline", {});
};

const GetProjectsStatisticTimeRange = async () => {
  return await api().get("Projects/GetProjectsStatisticTimeRange", {});
};


const createFolder = async (title, color, folderId) => {
  return await api().post("Projects/", { title, color, folderId });
};

export default {
  getProjects,
  createFolder,
  GetProjectsSatistic,
  GetProjectsTimeline,
  GetProjectsStatisticTimeRange
};