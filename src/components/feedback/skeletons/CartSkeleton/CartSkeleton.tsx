import ContentLoader from "react-content-loader";
import { Row, Col } from "react-bootstrap";

const CartSkeleton = () => {
  return (
    <Row>
      <Col>
        <ContentLoader
          speed={2}
          width={500}
          height={210}
          viewBox="0 0 500 210"
          backgroundColor="#f0f0f0"
          foregroundColor="#ffffff"
        >
          <rect x="140" y="2" rx="3" ry="3" width="105" height="8" />
          <rect x="6" y="2" rx="0" ry="0" width="119" height="178" />
          <rect x="141" y="19" rx="3" ry="3" width="86" height="9" />
          <rect x="140" y="141" rx="0" ry="0" width="96" height="37" />
        </ContentLoader>
      </Col>
    </Row>
  );
};

export default CartSkeleton;
