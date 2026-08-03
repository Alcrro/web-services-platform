import { IPackageName } from "@/modules/services/domain/types/service.types";

// doar formatează valoarea numerica în EUR
export const formatPriceValue = (price: number | string): string => {
  return Number(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
// decide cum afișezi prețul în funcție de pachet
export const priceDisplay = (
  price: number | null | undefined,
  packageName: IPackageName
): string => {
  if (price === null || price === undefined) return "Contact us for a quote";

  switch (packageName) {
    case "premium-custom-website":
      return "Contact us for a quote";

    case "starter-website":
      return `${formatPriceValue(price)}`;

    default:
      return `Start from ${formatPriceValue(price)}`;
  }
};
