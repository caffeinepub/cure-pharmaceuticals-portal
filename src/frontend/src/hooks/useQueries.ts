import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  LeadId,
  LeadInquiry,
  ShowcaseImage,
  ShowcaseImageId,
} from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllLeads() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[LeadId, LeadInquiry]>>({
    queryKey: ["leads"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLeads();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (inquiry: LeadInquiry) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(inquiry);
    },
  });
}

export function useDeleteLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: LeadId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteLeadById(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllShowcaseImages() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[ShowcaseImageId, ShowcaseImage]>>({
    queryKey: ["showcaseImages"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllShowcaseImages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddShowcaseImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ url, caption }: { url: string; caption: string }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).addShowcaseImage(url, caption);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showcaseImages"] });
    },
  });
}

export function useDeleteShowcaseImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: ShowcaseImageId) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).deleteShowcaseImage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showcaseImages"] });
    },
  });
}
