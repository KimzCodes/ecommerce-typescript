import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Form } from "react-bootstrap";

type InputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  type?: string;
  register: UseFormRegister<TFieldValues>; // UseFormRegister with generic type T
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = <TFieldValues extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  error,
  onBlur,
}: InputProps<TFieldValues>) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...register(name)}
        type={type}
        onBlur={onBlur ? onBlur : register(name).onBlur}
        isInvalid={error ? true : false}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
