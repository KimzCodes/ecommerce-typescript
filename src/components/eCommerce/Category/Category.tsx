import styles from "./styles.module.css";
const { category, categoryImg, categoryTitle } = styles;

const Category = () => {
  return (
    <div className={category}>
      <div className={categoryImg}>
        <img
          src="https://cdn-eu.dynamicyield.com/api/9876644/images/244c68ad42d8b__hp-w12-22032022-h_m-women_shirts-blouses.jpg"
          alt=""
        />
      </div>
      <h4 className={categoryTitle}>Title</h4>
    </div>
  );
};

export default Category;
