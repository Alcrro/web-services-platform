"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AdminServicesAPI } from "../infrastructure/admin-services.api";
import {
  IPricingConfigInput,
  IServiceFeature,
} from "../domain/types/service.types";
import { UpsertServiceFeatureInput } from "../application/usecases/UpsertServiceFeature.usecase";

const api = new AdminServicesAPI();

export function useAllFeatures() {
  return useQuery({
    queryKey: ["admin", "features"],
    queryFn: () => api.getAllFeatures(),
    staleTime: 1000 * 60 * 5,
  });
}

type AddFeaturePayload = Omit<UpsertServiceFeatureInput, "serviceId">;
type UpdateFeaturePayload = Pick<
  IServiceFeature,
  "type" | "hours" | "unitPrice" | "isIncluded" | "quantity"
>;

export function useAddServiceFeature(serviceUniqueId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddFeaturePayload) =>
      api.addServiceFeature(serviceUniqueId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "features"] });
      router.refresh();
    },
  });
}

export function useUpdateServiceFeature(serviceUniqueId: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      featureId,
      data,
    }: {
      featureId: string;
      data: UpdateFeaturePayload;
    }) => api.updateServiceFeature(serviceUniqueId, featureId, data),
    onSuccess: () => {
      router.refresh();
    },
  });
}

export function useRemoveServiceFeature(serviceUniqueId: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: (featureId: string) =>
      api.removeServiceFeature(serviceUniqueId, featureId),
    onSuccess: () => {
      router.refresh();
    },
  });
}

export function useUpsertPricingConfig(serviceUniqueId: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: IPricingConfigInput) =>
      api.upsertPricingConfig(serviceUniqueId, data),
    onSuccess: () => {
      router.refresh();
    },
  });
}
