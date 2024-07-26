import type { PostProps } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllPosts = () =>
  useQuery<PostProps[]>({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then((res) => res.json()),
  });

export const useAddPost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          content,
        }),
      });
      return await res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
};

// get all liked posts
export const useLikedPosts = () =>
  useQuery<PostProps[]>({
    queryKey: ["liked-posts"],
    queryFn: () => fetch("/api/posts/liked").then((res) => res.json()),
  });

export const useLikePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/posts/${id}/like`, {
        method: "POST",
      });
      return await res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      qc.invalidateQueries({ queryKey: ["liked-posts"] });
    },
  });
};

export const useDeletePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      return await res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
};
