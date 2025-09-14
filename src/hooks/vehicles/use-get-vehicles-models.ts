import { useQuery } from "@tanstack/react-query";
import type { VehicleModel } from "../../interfaces/vehicles.interface";
import type { AxiosApiError } from "../../types/error.types";
import getVehiclesModels from "../../services/vehicles/get-vehicle-models.service";

export const useGetVehiclesModels = () => {
  const SIXTY_MINUTES = 60 * 60 * 1000;

  const { data, isLoading, error, isFetching } = useQuery<
    VehicleModel[],
    AxiosApiError
  >({
    queryKey: ["get-vehicles-models"],
    queryFn: async () => {
      const response = await getVehiclesModels();
      return response.data;
    },
    enabled: true,
    staleTime: SIXTY_MINUTES,
  });

  return {
    models: data,
    isLoadingModels: isLoading,
    error,
    isFetching,
  };
};
