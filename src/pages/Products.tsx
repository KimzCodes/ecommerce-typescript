import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix } from "@store/products/productsSlice";
import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";

const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { loading, records, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));
  }, [dispatch, params]);
  console.log(records);
  const productsList =
    records.length > 0
      ? records.map((el) => (
          <Col
            key={el.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Product {...el} />
          </Col>
        ))
      : "there is no categories";

  return (
    <Container>
      <Row>{productsList}</Row>
    </Container>
  );
};

export default Products;
