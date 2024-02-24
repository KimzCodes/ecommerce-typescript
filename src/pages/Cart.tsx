import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByItems } from "@store/cart/cartSlice";
import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(actGetProductsByItems());
  }, [dispatch]);

  return (
    <>
      <Heading>Cart</Heading>
      <CartItemList products={productsFullInfo} />
      <CartSubtotalPrice />
    </>
  );
};

export default Cart;
