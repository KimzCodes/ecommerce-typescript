import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const Error = () => {
  const error = useRouteError();
  let errorStatus: number;
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText;
  } else {
    errorStatus = 404;
    errorMessage = "Page Not Found";
  }

  return (
    <Container className="notFound">
      <h1>{errorStatus}</h1>
      <p>{errorMessage}</p>
      <Link to="/" replace={true}>
        Looks like you've reached to non-existent page. <br />
        How about going back to safety?
      </Link>
    </Container>
  );
};

export default Error;
