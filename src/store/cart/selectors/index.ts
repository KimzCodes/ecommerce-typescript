import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const totalQuantity = Object.values(items).reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );
    return totalQuantity;
  }
);

const itemQuantityAvailabilityCheckingSelector = createSelector(
  (itemQuantity) => itemQuantity,
  (_, itemMax) => itemMax,
  (itemQuantity, itemMax) => {
    const currentItemQuantityInCart = itemQuantity || 0;
    const currentRemainingQuantity = itemMax - currentItemQuantityInCart;
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;
    return { currentRemainingQuantity, quantityReachedToMax };
  }
);

export {
  getCartTotalQuantitySelector,
  itemQuantityAvailabilityCheckingSelector,
};
