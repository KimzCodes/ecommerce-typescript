import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { getProductAvailableQuantitySelector } from "@store/products/productsSlice";
import { Button, Spinner } from "react-bootstrap";
import { TProduct } from "@customTypes/product";

import styles from "./styles.module.css";
const { product, productImg, maximumNotice } = styles;

const Product = ({ id, title, price, img, max }: TProduct) => {
  const dispatch = useAppDispatch();
  const [isBtnClicked, setIsBtnClicked] = useState(0);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const { currentRemainingQuantity, quantityReachedToMax } = useAppSelector(
    (state) => getProductAvailableQuantitySelector(state.cart.items[id], max)
  );

  useEffect(() => {
    if (!isBtnClicked) {
      return;
    }
    setIsBtnDisabled(true);

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnClicked]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnClicked((prev) => prev + 1);
  };

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price} EGP</h3>
      <p className={maximumNotice}>
        {quantityReachedToMax
          ? "You reached to the limit"
          : `You can add ${currentRemainingQuantity} item(s)`}
      </p>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={addToCartHandler}
        disabled={isBtnDisabled || quantityReachedToMax}
      >
        {isBtnDisabled ? (
          <>
            <Spinner animation="border" size="sm" /> Loading...
          </>
        ) : (
          "Add to cart"
        )}
      </Button>
    </div>
  );
};

export default Product;
