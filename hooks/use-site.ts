import { uploadImage } from "@/lib/upload";
import type { SiteProps } from "@/types";
import type { Like } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useSite() {
  const qc = useQueryClient();

  const getAll = useQuery<SiteProps[]>({
    queryKey: ["sites"],
    queryFn: () => fetch("/api/sites").then((res) => res.json()),
  });

  const addSite = useMutation({
    mutationFn: async (values: { name: string; url: string; file: File }) => {
      const upload = await uploadImage(values.file);
      const res = await fetch("/api/sites", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          url: values.url,
          image: upload.Location,
        }),
      });
      return await res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sites"] }),
  });

  const searchSite = useMutation({
    mutationFn: async (q: string) => {
      const res = await fetch(`/api/sites/search/${q}`);
      return await res.json();
    },
  });

  const getUserLikes = useQuery<Like[]>({
    queryKey: ["userLikes"],
    queryFn: () => fetch("/api/user/likes").then((res) => res.json()),
  });

  const toggleLike = useMutation({
    mutationFn: async (siteId: string) => {
      const res = await fetch("/api/user/likes", {
        method: "POST",
        body: JSON.stringify({ siteId }),
      });
      return await res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userLikes"] });
      qc.invalidateQueries({ queryKey: ["sites"] });
    },
  });

  return { addSite, getAll, searchSite, getUserLikes, toggleLike };
}

export { useSite };
