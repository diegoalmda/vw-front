import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { AxiosApiError } from "../../types/error.types";
import type {
  PaginatedVehicles,
  VehicleCreatePayload,
} from "../../interfaces/vehicles.interface";
import createVehicle from "../../services/vehicles/create-vehicle.service";
import type { LoginPayload } from "../../interfaces/auth.interface";

export interface UseVehicleCreationOptions {
  onSuccess?: (data: PaginatedVehicles) => void;
  onError?: (error: AxiosApiError) => void;
}

export type UseCreateVehicleOptions = Omit<
  UseMutationOptions<PaginatedVehicles, AxiosApiError, LoginPayload>,
  "mutationFn" | "onSuccess" | "onError" | "onSettled"
> &
  UseVehicleCreationOptions;

export const useCreateVehicle = (options?: UseCreateVehicleOptions) => {
  const { mutateAsync, isPending, isError, error } = useMutation<
    PaginatedVehicles,
    AxiosApiError,
    VehicleCreatePayload
  >({
    mutationFn: async (payload: VehicleCreatePayload) => {
      const response = await createVehicle(payload);
      return response.data;
    },
    onSuccess: (data: PaginatedVehicles) => {
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
