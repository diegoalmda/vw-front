import { create } from "zustand";
import { persist } from "zustand/middleware";
import { encryptedStorage } from "../utils/encrypted-storage";
import { AUTH_STORE_KY } from "../constants/store-keys";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken, isAuthenticated: true });
      },

      clearAuth: () => {
        set({ accessToken: null, refreshToken: null, isAuthenticated: false });
      },
    }),
    {
      name: AUTH_STORE_KY,
      storage: encryptedStorage,
    }
  )
);
