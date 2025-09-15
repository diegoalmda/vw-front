import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { AxiosApiError } from "../../types/error.types";
import type { CreateUserPayload, User } from "../../interfaces/users.interface";
import createUser from "../../services/users/create-user.service";

export interface UseUserCreationOptions {
  onSuccess?: (data: User) => void;
  onError?: (error: AxiosApiError) => void;
}

export type UseCreateUserMutationOptions = Omit<
  UseMutationOptions<User, AxiosApiError, CreateUserPayload>,
  "mutationFn" | "onSuccess" | "onError" | "onSettled"
> &
  UseUserCreationOptions;

export const useCreateUser = (options?: UseCreateUserMutationOptions) => {
  const { mutateAsync, isPending, isError, error } = useMutation<
    User,
    AxiosApiError,
    CreateUserPayload
  >({
    mutationFn: async (payload: CreateUserPayload) => {
      const response = await createUser(payload);
      return response.data;
    },
    onSuccess: (data: User) => {
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
