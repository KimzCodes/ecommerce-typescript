import { Form } from "react-bootstrap";
import { useController, useForm } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  onChange?: () => void;
  onBlur?: () => void;
  error: string;
};

const Input = ({ label, name, onChange, onBlur, error }: InputProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        isInvalid={error ? true : false}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
