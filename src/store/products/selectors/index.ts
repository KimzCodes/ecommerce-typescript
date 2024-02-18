import { createSelector } from "@reduxjs/toolkit";

const getProductAvailableQuantitySelector = createSelector(
  (item) => item,
  (_, itemMax) => itemMax,
  (item, itemMax) => {
    const currentItemsInCart = item || 0;
    const currentRemainingQuantity = itemMax - currentItemsInCart;
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;
    return { currentRemainingQuantity, quantityReachedToMax };
  }
);

export { getProductAvailableQuantitySelector };
