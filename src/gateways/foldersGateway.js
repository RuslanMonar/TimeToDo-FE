import { api } from "../config/httpClients/axios";

  const getFolders = async () => {
    return await api().get("Folders/");
};

export default {
    getFolders
  };