import { useQueryClient } from "@tanstack/react-query";

export function useInvalidateQuery() {
  const queryClient = useQueryClient();

  const invalidate = (queryKey: (string | number)[]) => {
    return queryClient.invalidateQueries({ queryKey });
  };

  return invalidate;
}
