import { useEffect, useState } from "react";

import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { Button, Spinner } from "react-bootstrap";
import { TProduct } from "@customTypes/product";

import styles from "./styles.module.css";

// styles
const { product, productImg, maximumNotice, wishListBtn } = styles;

type ProductProps = TProduct & {
  addToCartHandler: (id: number) => void;
  wishListHandler: (id: number) => void;
};

const Product = ({
  id,
  title,
  price,
  img,
  max,
  quantity,
  isLiked,
  addToCartHandler,
  wishListHandler,
}: ProductProps) => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

  useEffect(() => {
    setLoading(false);
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

  const addToCart = () => {
    addToCartHandler(id);
    setIsBtnDisabled(true);
  };

  const toggleLikeHandler = () => {
    wishListHandler(id);
    setLoading(true);
  };

  return (
    <div className={product}>
      <div className={wishListBtn} onClick={toggleLikeHandler}>
        {loading ? (
          <Spinner animation="border" size="sm" variant="primary" />
        ) : isLiked ? (
          <LikeFill />
        ) : (
          <Like />
        )}
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
        onClick={addToCart}
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
