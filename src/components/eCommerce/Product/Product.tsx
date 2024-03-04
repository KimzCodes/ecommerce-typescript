import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  addToCart,
  itemQuantityAvailabilityCheckingSelector,
} from "@store/cart/cartSlice";
import { actAddToWishList } from "@store/wishlist/wishlistSlice";

import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { Button, Spinner } from "react-bootstrap";
import { TProduct } from "@customTypes/product";

import styles from "./styles.module.css";

// styles
const { product, productImg, maximumNotice, wishListBtn } = styles;

const Product = ({
  id,
  title,
  price,
  img,
  max,
  quantity,
  isLiked,
}: TProduct) => {
  const dispatch = useAppDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isLikedOptimistic, setIsLikedOptimistic] = useState(false);

  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

  useEffect(() => {
    if (isLiked) {
      setIsLikedOptimistic(true);
    }
  }, [isLiked]);

  useEffect(() => {
    if (!isBtnDisabled) {
      return;
    }

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

  const toggleLikeHandler = () => {
    setIsLikedOptimistic((prev) => !prev);
    dispatch(actAddToWishList(id))
      .unwrap()
      .catch(() => {
        setIsLikedOptimistic(false);
      });
  };

  return (
    <div className={product}>
      <div className={wishListBtn} onClick={toggleLikeHandler}>
        {isLikedOptimistic ? <LikeFill /> : <Like />}
      </div>

      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price.toFixed(2)} EGP</h3>
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
