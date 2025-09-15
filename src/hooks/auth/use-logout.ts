import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { LogoutResponse } from "../../interfaces/auth.interface";
import type { AxiosApiError } from "../../types/error.types";
import userLogout from "../../services/auth/user-logout.service";

export interface LogoutOptions {
  onSuccess?: (data: LogoutResponse) => void;
  onError?: (error: AxiosApiError) => void;
}

export type UseLogoutMutationOptions = Omit<
  UseMutationOptions<LogoutResponse, AxiosApiError>,
  "mutationFn" | "onSuccess" | "onError" | "onSettled"
> &
  LogoutOptions;

export const useLogout = (options?: UseLogoutMutationOptions) => {
  const { mutateAsync, isPending, isError, error } = useMutation<
    LogoutResponse,
    AxiosApiError
  >({
    mutationFn: async () => {
      const response = await userLogout();
      return response.data;
    },
    onSuccess: (data: LogoutResponse) => {
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
