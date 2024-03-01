import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";

const itemIsLikedCheckingSelector = createSelector(
  (state: RootState) => state.wishlist.items,
  (_, itemId) => itemId,
  (items, itemId) => {
    return items.includes(itemId);
  }
);

export { itemIsLikedCheckingSelector };
