import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, productsCleanUp } from "@store/wishlist/wishlistSlice";
import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { TProduct } from "@customTypes/product";

const Wishlist = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { recordsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(actGetWishlist());

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  const productsFullInfo = recordsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: true,
  }));

  return (
    <>
      <Heading>{params.prefix?.toUpperCase()} Wishlist</Heading>
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
