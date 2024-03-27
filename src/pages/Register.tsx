import { Heading } from "@components/common";
import { Form, Button, Row, Col } from "react-bootstrap";

const Register = () => {
  return (
    <>
      <Heading title="User Register" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name </Form.Label>
              <Form.Control type="text" name="firstName" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name </Form.Label>
              <Form.Control type="text" name="lastName" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="text" name="email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" />
            </Form.Group>

            <Button variant="info" type="submit" style={{ color: "white" }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
