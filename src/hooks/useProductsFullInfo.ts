import { useAppSelector } from "@store/hooks";

const useProductsFullInfo = () => {
  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => {
    return state.cart.items;
  });
  const wishlist = useAppSelector((state) => state.wishlist.items);

  const recordsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: wishlist.includes(el.id),
  }));

  return { loading, error, recordsFullInfo };
};

export default useProductsFullInfo;
