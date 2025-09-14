import CryptoJS from "crypto-js";
import { createJSONStorage } from "zustand/middleware";

const ENCRYPTION_SECRET = import.meta.env.VITE_ENCRYPTION_SECRET;

export const encryptedStorage = createJSONStorage(() => ({
  setItem: (name: string, value: string) => {
    const encryptedValue = CryptoJS.AES.encrypt(
      value,
      ENCRYPTION_SECRET
    ).toString();
    localStorage.setItem(name, encryptedValue);
  },
  getItem: (name: string) => {
    const encryptedValue = localStorage.getItem(name);
    if (!encryptedValue) return null;

    try {
      const decryptedBytes = CryptoJS.AES.decrypt(
        encryptedValue,
        ENCRYPTION_SECRET
      );
      const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
      return decryptedValue || null;
    } catch (e) {
      console.error("Falha ao descriptografar dados do localStorage", e);
      return null;
    }
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
}));
