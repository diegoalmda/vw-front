import { useQuery } from "@tanstack/react-query";
import type { AxiosApiError } from "../../types/error.types";
import getUsers from "../../services/users/get-users.service";
import type { User } from "../../interfaces/users.interface";
import { GET_USERS_QUERY_KEY } from "../../constants/query-keys";

export const useGetUsers = () => {
  const { data, isLoading, error, isFetching } = useQuery<
    User[],
    AxiosApiError
  >({
    queryKey: [GET_USERS_QUERY_KEY],
    queryFn: async () => {
      const response = await getUsers();
      return response.data;
    },
    enabled: true,
  });

  return {
    users: data,
    isLoadingUsers: isLoading,
    error,
    isFetching,
  };
};
