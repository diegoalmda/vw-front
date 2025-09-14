import { useQuery } from "@tanstack/react-query";
import type { VehicleColor } from "../../interfaces/vehicles.interface";
import type { AxiosApiError } from "../../types/error.types";
import getVehiclesColors from "../../services/vehicles/get-vehicle-colors.service";

export const useGetVehiclesColors = () => {
  const SIXTY_MINUTES = 60 * 60 * 1000;

  const { data, isLoading, error, isFetching } = useQuery<
    VehicleColor[],
    AxiosApiError
  >({
    queryKey: ["get-vehicles-colors"],
    queryFn: async () => {
      const response = await getVehiclesColors();
      return response.data;
    },
    enabled: true,
    staleTime: SIXTY_MINUTES,
  });

  return {
    colors: data,
    isLoadingColors: isLoading,
    error,
    isFetching,
  };
};
