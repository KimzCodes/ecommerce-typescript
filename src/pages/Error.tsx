import Lottie from "lottie-react";
import notFound from "@assets/lotties/notFound.json";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const Error = () => {
  return (
    <Container className="notFound">
      <Lottie animationData={notFound} style={{ width: "700px" }} />
      <Link to="/" replace={true}>
        How about going back to safety?
      </Link>
    </Container>
  );
};

export default Error;
