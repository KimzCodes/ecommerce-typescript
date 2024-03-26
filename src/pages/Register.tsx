import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister } from "@store/auth/authSlice";
import {
  actEmailChecker,
  resetEmailChecker,
} from "@store/emailChecker/emailCheckerSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchemaValidation,
  signUpSchemaType,
} from "@validations/signUpSchema";
import { Heading } from "@components/common";
import { Input } from "@components/form";
import { Form, Button, Row, Col } from "react-bootstrap";

const Register = () => {
  const dispatch = useAppDispatch();
  const { enteredEmail, emailChecking } = useAppSelector(
    (state) => state.emailChecker
  );

  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchemaValidation),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<signUpSchemaType> = (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }));
  };

  const emailCheckingHandler = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");

    if (isDirty && !invalid && enteredEmail !== value) {
      dispatch(actEmailChecker(value));
    }

    if (enteredEmail && value.length === 0) {
      dispatch(resetEmailChecker());
    }
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
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailChecking === "notFree"
                  ? "This email is already in use"
                  : ""
              }
              onBlur={emailCheckingHandler}
              success={
                emailChecking === "free"
                  ? " This email is available for use."
                  : ""
              }
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
