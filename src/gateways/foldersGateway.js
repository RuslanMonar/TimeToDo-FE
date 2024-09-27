import { api } from "../config/httpClients/axios";

const getFolders = async () => {
  return await api().get("Folders/");
};
const createFolder = async (title, color) => {
  return await api().post("Folders/", { title, color });
};

export default {
  getFolders,
  createFolder
};