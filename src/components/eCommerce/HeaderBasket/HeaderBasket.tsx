//import as component for optimization and speed up loading of svg file
import Logo from "@assets/svg/cart.svg?react";
import styles from "./styles.module.css";
const { basketContainer, basketQuantity } = styles;

const HeaderBasket = () => {
  return (
    <div className={basketContainer}>
      <Logo title="icon title" />
      <div className={basketQuantity}>0</div>
    </div>
  );
};

export default HeaderBasket;
