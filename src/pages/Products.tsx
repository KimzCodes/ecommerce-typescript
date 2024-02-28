import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";
import { addToCart } from "@store/cart/cartSlice";
import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { TProduct } from "@customTypes/product";

const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const items = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  const recordsFullInfo = records.map((el) => ({
    ...el,
    quantity: items[el.id] || 0,
  }));

  const addToCartHandler = useCallback(
    (id: number) => {
      dispatch(addToCart(id));
    },
    [dispatch]
  );

  return (
    <>
      <Heading>{params.prefix?.toUpperCase()} Products</Heading>
      <Loading status={loading} error={error}>
        <GridList<TProduct>
          records={recordsFullInfo}
          renderItem={(record) => (
            <Product {...record} addToCartHandler={addToCartHandler} />
          )}
        />
      </Loading>
    </>
  );
};

export default Products;
