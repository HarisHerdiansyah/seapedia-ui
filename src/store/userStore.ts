import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserData = {
  id?: string;
  email?: string;
  username?: string;
  allowedAs?: string[];
  [key: string]: any;
};

interface UserState {
  user: UserData | null;
  accessToken: string | null;
  activeRole: string | null;
  setLoginData: (user: UserData, accessToken: string) => void;
  setActiveRole: (role: string, accessToken: string, user: UserData) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      activeRole: null,
      setLoginData: (user, accessToken) =>
        set({ user, accessToken, activeRole: null }),
      setActiveRole: (activeRole, accessToken, user) =>
        set({ activeRole, accessToken, user }),
      logout: () => set({ user: null, accessToken: null, activeRole: null }),
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        activeRole: state.activeRole,
      }), // Pick what to persist
    },
  ),
);
