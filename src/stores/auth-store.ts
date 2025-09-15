import { create } from "zustand";
import { persist } from "zustand/middleware";
import { encryptedStorage } from "../utils/encrypted-storage";
import { AUTH_STORE_KY } from "../constants/store-keys";
import { jwtDecode } from "jwt-decode";

interface UserPayload {
  uuid: string;
  name: string;
  isRoot: boolean;
}
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: UserPayload | null;
  setAuth: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      user: null,

      setAuth: (accessToken, refreshToken) => {
        try {
          const user = jwtDecode<UserPayload>(accessToken);
          set({
            accessToken,
            refreshToken,
            isAuthenticated: true,
            user,
          });
        } catch (e) {
          console.error("Failed to decode access token:", e);
          set({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            user: null,
          });
        }
      },

      clearAuth: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: AUTH_STORE_KY,
      storage: encryptedStorage,
    }
  )
);
