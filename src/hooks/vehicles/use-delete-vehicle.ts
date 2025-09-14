import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { AxiosApiError } from "../../types/error.types";
import type { Vehicle } from "../../interfaces/vehicles.interface";
import type { LoginPayload } from "../../interfaces/auth.interface";
import deleteVehicle from "../../services/vehicles/delete-vehicle.service";

export interface UseVehicleRemoveOptions {
  onSuccess?: (data: Vehicle) => void;
  onError?: (error: AxiosApiError) => void;
}

export type UseDeleteVehicleOptions = Omit<
  UseMutationOptions<Vehicle, AxiosApiError, LoginPayload>,
  "mutationFn" | "onSuccess" | "onError" | "onSettled"
> &
  UseVehicleRemoveOptions;

export const useDeleteVehicle = (options?: UseDeleteVehicleOptions) => {
  const { mutateAsync, isPending, isError, error } = useMutation<
    Vehicle,
    AxiosApiError,
    Vehicle["uuid"]
  >({
    mutationFn: async (vehicleId: Vehicle["uuid"]) => {
      const response = await deleteVehicle(vehicleId);
      return response.data;
    },
    onSuccess: (data: Vehicle) => {
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
