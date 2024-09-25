import { api } from "../config/httpClients/axios";

  const getUser = async () => {
    return await api().get("Users/User");
};

export default {
    getUser
  };