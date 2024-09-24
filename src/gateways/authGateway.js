import { api } from "../config/httpClients/Axios";

const signUp = async (username, email, password) => {
    let data = { username, email, password };
    const response = await api().post("Auth/register", data);
    if (response.data.token) {
      AddToStorage(response.data.token);
    }
  return response;
  };

  const signIn = async (email, password) => {
    let data = {email, password };
    return await api().post("Auth/login", data);
};

export default {
    signUp,
    signIn
  };