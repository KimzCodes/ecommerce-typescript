import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInSchemaType,
  signInSchemaValidation,
} from "@validations/signInSchema";
import { Heading } from "@components/common";
import { Input } from "@components/form";
import { Form, Button, Row, Col } from "react-bootstrap";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchemaValidation),
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<signInSchemaType> = (data) => console.log(data);

  return (
    <>
      <Heading title="Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="email"
              label="Email"
              register={register}
              error={errors.email?.message}
            />
            <Input
              name="password"
              label="Password"
              register={register}
              error={errors.password?.message}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
