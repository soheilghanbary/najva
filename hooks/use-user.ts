import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUser() {
  const qc = useQueryClient();

  const getUser = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((res) => res.json()),
  });

  const updateUser = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return await res.json();
    },
    onSuccess(data) {
      toast.success(data.msg);
      qc.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { getUser, updateUser };
}

export const useGetUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((res) => res.json()),
  });
