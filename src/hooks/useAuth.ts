import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";

export function useAuth() {
  const [isHydrated, setIsHydrated] = useState(false);
  const user = useUserStore((state) => state.user);
  const accessToken = useUserStore((state) => state.accessToken);
  const activeRole = useUserStore((state) => state.activeRole);

  const setLoginData = useUserStore((state) => state.setLoginData);
  const setActiveRole = useUserStore((state) => state.setActiveRole);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isLoggedIn = !!accessToken;

  return {
    isHydrated,
    isLoggedIn,
    user,
    accessToken,
    activeRole,
    setLoginData,
    setActiveRole,
    logout,
  };
}
