import {
  IService,
  IServiceFeature,
} from "@/modules/services/domain/types/service.types";

export function calculatePrice(
  service: IService,
  selectedOptions: Partial<IServiceFeature>[],
  quantity: number
) {
  const base = service.pricingConfig?.displayPrice ?? 0;

  const optionsPrice = selectedOptions.reduce(
    (acc, o) => acc + o.unitPrice!,
    0
  );
  const subtotal = base + optionsPrice;
  const discount = quantity >= 3 ? 0.08 * subtotal : 0;
  const total = Math.round((subtotal - discount) * quantity);
  return { base, optionsPrice, discount, total };
}
