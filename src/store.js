import { create } from "zustand";

import  authGateway  from "./gateways/authGateway"
import { GetUserInfoFromToken } from "./services/jwtTokenService";

const useStore = create((set) => ({
    user: null,

    setUser: (data) => set({ user: data }),
    signIn: async (email, password) => {
        const { data, error } = await authGateway.signIn(email, password);

        if (error) {
          throw error;
        }

        if (!!data.errors) {
          throw Error(data.errors);
        }
        
        var user = GetUserInfoFromToken(data.token);
        set({ user: user});
        
        localStorage.setItem("jwtToken", JSON.stringify(data.token));
      },
      signOut: async () => {
        localStorage.removeItem("jwtToken")
        set({ user: null });
      },
}));

export default useStore;