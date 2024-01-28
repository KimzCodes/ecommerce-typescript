import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const Error = () => {
  const error = useRouteError();
  let errorStatus: number;
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText;
  } else {
    errorStatus = 404;
    errorMessage = "Page not found";
  }

  return (
    <Container>
      <h1>{errorStatus}</h1>
      <p>{errorMessage}</p>
      <Button variant="link">Go Back</Button>
    </Container>
  );
};

export default Error;
