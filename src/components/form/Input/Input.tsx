import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Form } from "react-bootstrap";

type InputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  type?: string;
  register: UseFormRegister<TFieldValues>;
  error?: string;
  success?: string;
  disabled?: boolean;
  formText?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = <TFieldValues extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  error,
  success,
  disabled,
  onBlur,
  formText,
}: InputProps<TFieldValues>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      register(name).onBlur(e);
      onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...register(name)}
        type={type}
        onBlur={onBlurHandler}
        isInvalid={error ? true : false}
        isValid={success ? true : false}
        disabled={disabled}
      />
      {formText && <Form.Text muted>{formText}</Form.Text>}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
