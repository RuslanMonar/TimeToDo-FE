import { api } from "../config/httpClients/axios";

  const getProjects = async (folderId) => {
    return await api().get("Projects/", {
      params: {
        folderId: folderId
      }
    });
};

export default {
    getProjects
  };