// import Api from "@/services/withoutAuthActivities/product"

export const loadCartState = () => {
  try {
    const serialState = localStorage.getItem("cart");
    if (serialState === null) {
      return [];
    }
    return JSON.parse(serialState);
  } catch (err) {
    return [];
  }
};
