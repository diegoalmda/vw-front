import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
  PaginatedVehicles,
  VehicleFilterParams,
} from "../../interfaces/vehicles.interface";
import type { AxiosApiError } from "../../types/error.types";
import getVehicles from "../../services/vehicles/get-vehicles.service";
import { GET_VEHICLES_QUERY_KEY } from "../../constants/query-keys";

export interface UseGetVehiclesOptions {
  onSuccess?: (data: PaginatedVehicles) => void;
  onError?: (error: AxiosApiError) => void;
  enabled?: boolean;
}

export type UseGetVehiclesQueryOptions = Omit<
  UseQueryOptions<PaginatedVehicles, AxiosApiError>,
  "queryFn" | "queryKey"
> &
  UseGetVehiclesOptions;

export const useGetVehicles = (
  params: VehicleFilterParams,
  options?: UseGetVehiclesQueryOptions
) => {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<
    PaginatedVehicles,
    AxiosApiError
  >({
    queryKey: [GET_VEHICLES_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getVehicles(params);
      return response.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    enabled: true,
    ...options,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  };
};
