import { api } from "../config/httpClients/axios";

const getProjects = async (folderId) => {
  return await api().get("Projects/", {
    params: {
      folderId: folderId
    }
  });
};


const createFolder = async (title, color, folderId) => {
  return await api().post("Projects/", { title, color, folderId });
};

export default {
  getProjects,
  createFolder
};