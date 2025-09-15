import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { AxiosApiError } from "../../types/error.types";
import type { UpdateUserPayload, User } from "../../interfaces/users.interface";
import updateUser from "../../services/users/update-user.service";

export interface UpdateUserVariables {
  userId: User["uuid"];
  payload: UpdateUserPayload;
}

export interface UseUserUpdateOptions {
  onSuccess?: (data: User) => void;
  onError?: (error: AxiosApiError) => void;
}

export type UseUpdateUserMutationOptions = Omit<
  UseMutationOptions<User, AxiosApiError, UpdateUserPayload>,
  "mutationFn" | "onSuccess" | "onError" | "onSettled"
> &
  UseUserUpdateOptions;

export const useUpdateUser = (options?: UseUpdateUserMutationOptions) => {
  const { mutateAsync, isPending, isError, error } = useMutation<
    User,
    AxiosApiError,
    UpdateUserVariables
  >({
    mutationFn: async ({ userId, payload }) => {
      const response = await updateUser(userId, payload);
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
