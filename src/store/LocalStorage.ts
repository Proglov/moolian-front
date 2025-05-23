import { ICartProductItem } from "./CartProductsSlice";


export const loadCartState = (): ICartProductItem[] => {
  try {
    const serialState = localStorage.getItem("cart");
    if (!serialState) return [];

    const parsed = JSON.parse(serialState);

    // Validate and sanitize the data
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item) => {
      return (
        typeof item === "object" &&
        item !== null &&
        "_id" in item &&
        "number" in item &&
        typeof item.number === "number" &&
        item.number > 0
      );
    });
  } catch {
    return [];
  }
};
