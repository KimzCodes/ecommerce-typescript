import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Form } from "react-bootstrap";

type InputProps<T extends FieldValues> = {
  name: Path<T>; // Name should be a string
  label: string;
  type?: string;
  register: UseFormRegister<T>; // UseFormRegister with generic type T
  error?: string;
};

const Input = <T extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  error,
}: InputProps<T>) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register(name)}
        isInvalid={error ? true : false}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
