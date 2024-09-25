import { api } from "../config/httpClients/axios";

const signUp = async (username, email, password) => {
    let data = { username, email, password };
    const response = await api().post("Auth/SignUp", data);
    if (response.data.token) {
      AddToStorage(response.data.token);
    }
  return response;
  };

  const signIn = async (email, password) => {
    let data = {email, password };
    return await api().post("Auth/SignIn", data);
};

export default {
    signUp,
    signIn
  };