import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetWishlist from "@store/wishlist/act/actGetWishlist";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { TProduct } from "@customTypes/product";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { recordsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  const productsFullInfo = recordsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: true,
  }));

  useEffect(() => {
    dispatch(actGetWishlist());
  }, [dispatch]);
  return (
    <>
      <Heading>Your Wishlist</Heading>
      <Loading status={loading} error={error}>
        <GridList<TProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
