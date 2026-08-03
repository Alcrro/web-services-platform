"use server";
import { OrdersAction } from "@/modules/orders/application/orders.action";
import { ClientVerificationResult } from "@/modules/orders/application/validators/validateOrder";
import { IServiceOrder } from "@/modules/orders/domain/types/order.types";

export async function sendConfigurator(
  payload: Partial<IServiceOrder>
): Promise<ClientVerificationResult> {
  try {
    const orderAction = new OrdersAction();
    const result = await orderAction.createOrder(payload);
    // 👉 DACA este deja eroare de validare
    if ("success" in result && result.success === false) {
      return result;
    }

    // 👉 aici stim sigur ca e Response
    const res = result as Response;

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return {
        success: false,
        errors: { formErrors: [data?.message ?? "Unknown error"] },
      };
    }
    return { success: true };
  } catch (error) {
    console.error("❌ Eroare rețea:", error);
    if (error instanceof Error) {
      return { success: false, errors: error.message };
    }
    return { success: false, errors: "internal error" };
  }
}
