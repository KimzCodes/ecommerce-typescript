import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

const CartItem = () => {
  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img
            src="https://eg.hm.com/assets/styles/HNM/14482498/6103a8463876770c30cdba3535b7be1f333315fe/2/image-thumb__3464789__product_listing/cb91f8f128ac2125e0ec3a008a2e8d2497d15434.jpg"
            alt="title"
          />
        </div>
        <div className={productInfo}>
          <h2>test</h2>
          <h3>30 EGP</h3>
          <Button
            variant="secondary"
            style={{ color: "white" }}
            className="mt-auto"
          >
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select aria-label="Default select example">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default CartItem;
