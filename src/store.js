import { create } from "zustand";

import authGateway from "./gateways/authGateway";
import { GetUserInfoFromToken } from "./services/jwtTokenService";

const useStore = create((set) => ({
    user: null,
    folders:[],
    activeProject: null,
    showCompleted: false,
    
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

      setFolders: (data) => {
        set(() => ({
          folders: [...data]
        }));
      },

      setActiveProject: (projectId) => set({ activeProject: projectId }),
      setShowCompleted: (showCompleted) => set({ showCompleted: showCompleted }),
}));

export default useStore;