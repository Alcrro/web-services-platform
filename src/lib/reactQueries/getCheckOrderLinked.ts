import { API_URL } from "@/shared/config/env";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useGetCheckOrderLinked() {
  return useQuery({
    queryKey: ["orderLinked"],
    queryFn: async () => {
      const result = await fetch(`${API_URL}/api/activity/check-order-linked`, {
        method: "GET",
        credentials: "include",
      });

      if (!result.ok) throw new Error("Failed to fetch linked order info");
      return result.json(); // { linked: boolean }
    },
    refetchOnWindowFocus: true,
  });
}

export interface OrderLinked {
  linked: boolean; // true if the guest orders are linked, false otherwise
}
async function patchOrderLinked(value: "later" | "yes") {
  const res = await fetch(`${API_URL}/api/activity/orders-linked`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  });
  if (!res.ok) throw new Error("Failed update");
  return res.json();
}
type PatchValue = "later" | "yes";

export function useMutationCheckOrderLinked() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchOrderLinked,

    onMutate: async (value: PatchValue) => {
      await queryClient.cancelQueries({ queryKey: ["orderLinked"] });
      const previousValue = queryClient.getQueryData<OrderLinked>([
        "orderLinked",
      ]);
      queryClient.setQueryData<OrderLinked>(["orderLinked"], (old) =>
        old ? { ...old, linked: value === "yes" } : { linked: value === "yes" }
      );
      return { previousValue };
    },

    onError: (_error, _value, context) => {
      queryClient.setQueryData(["orderLinked"], context?.previousValue);
    },

    onSuccess: (_data, value) => {
      // 6) Optional: sync with server response
      queryClient.invalidateQueries({ queryKey: ["orderLinked"] });

      // Show toast depending on action
      if (value === "yes") {
        toast.success("Orders successfully linked to your account!");
      } else if (value === "later") {
        toast.info("You can link your orders later.");
      }
    },
  });
}
