import { create } from "zustand";

import  authGateway  from "./gateways/authGateway"

const useStore = create((set) => ({
    user: null,

    setUser: (user) => set({ user }),
    signIn: async (email, password) => {
        const { data, error } = await authGateway.signIn(email, password);
        console.log("--> backend response");
        console.log(data);
        if (error) {
          throw error;
        }
    
      set({ user: { id: data.user.id, email: data.user.email } });
      },
}));