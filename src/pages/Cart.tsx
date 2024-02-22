import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByItems } from "@store/cart/cartSlice";
import { Heading } from "@components/common";
import { CartItem, CartSubtotalPrice } from "@components/eCommerce";

const Cart = () => {
  const dispatch = useAppDispatch();
  //   const { items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(actGetProductsByItems());
  }, [dispatch]);

  return (
    <>
      <Heading>Cart</Heading>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartSubtotalPrice />
    </>
  );
};

export default Cart;
