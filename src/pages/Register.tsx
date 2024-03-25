import { useAppDispatch } from "@store/hooks";
import { actAuthRegister } from "@store/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchemaValidation,
  signUpSchemaType,
} from "@validations/signUpSchema";
import { Heading, Input } from "@components/common";
import { Form, Button, Row, Col } from "react-bootstrap";

const Register = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchemaValidation),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<signUpSchemaType> = (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }));
  };
  return (
    <>
      <Heading title="Register" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="firstName"
              label="First Name"
              register={register}
              error={errors.firstName?.message}
            />
            <Input
              name="lastName"
              label="Last Name"
              register={register}
              error={errors.lastName?.message}
            />
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
            <Input
              name="confirmPassword"
              label="Confirm password"
              register={register}
              error={errors.confirmPassword?.message}
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

export default Register;
