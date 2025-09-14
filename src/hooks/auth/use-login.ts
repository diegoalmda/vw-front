import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/auth-store";
import type {
  LoginPayload,
  LoginResponse,
} from "../../interfaces/auth.interface";
import userLogin from "../../services/auth/user-login.service";
import type { AxiosApiError } from "../../types/error.types";

export interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: AxiosApiError) => void;
}

export type UseLoginMutationOptions = Omit<
  UseMutationOptions<LoginResponse, AxiosApiError, LoginPayload>,
  "mutationFn" | "onSuccess" | "onError" | "onSettled"
> &
  UseLoginOptions;

export const useLogin = (options?: UseLoginMutationOptions) => {
  const { setAuth } = useAuthStore();

  const { mutateAsync, isPending, isError, error } = useMutation<
    LoginResponse,
    AxiosApiError,
    LoginPayload
  >({
    mutationFn: async (credentials: LoginPayload) => {
      const response = await userLogin(credentials);
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      setAuth(data.access_token, data.refresh_token);
      options?.onSuccess?.(data);
    },
    onError: (error: AxiosApiError) => {
      options?.onError?.(error);
    },
  });

  return {
    mutate: mutateAsync,
    isPending,
    isError,
    error,
  };
};
