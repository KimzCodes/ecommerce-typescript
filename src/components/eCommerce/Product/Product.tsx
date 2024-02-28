import { useEffect, useState, memo } from "react";

import { Button, Spinner } from "react-bootstrap";
import { TProduct } from "@customTypes/product";

import styles from "./styles.module.css";
const { product, productImg, maximumNotice } = styles;

const Product = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    addToCartHandler,
  }: TProduct & { addToCartHandler?: (id: number) => void }) => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const currentRemainingQuantity = quantity ? max - quantity : max - 0;
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

    useEffect(() => {
      if (!isBtnDisabled) {
        return;
      }

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnDisabled]);

    return (
      <div className={product}>
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
          onClick={() => addToCartHandler && addToCartHandler(id)}
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
  }
);

export default Product;
