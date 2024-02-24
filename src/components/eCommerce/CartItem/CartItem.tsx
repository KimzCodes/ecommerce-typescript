import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/product";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type CartItemProps = TProduct;
const CartItem = ({ title, img, price, max, quantity }: CartItemProps) => {
  const renderQuantityOptions = Array(max)
    .fill(0)
    .map((_, idx) => {
      const optionValue = ++idx;
      return (
        <option value={optionValue} key={optionValue}>
          {optionValue}
        </option>
      );
    });

  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>{price} EGP</h3>
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
          >
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select value={quantity}>{renderQuantityOptions}</Form.Select>
      </div>
    </div>
  );
};

export default CartItem;
