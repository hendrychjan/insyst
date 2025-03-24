import { useFormikContext } from "formik";
import {
  Form as BootstrapForm,
  FormControlProps as BootstrapFormControlProps,
} from "react-bootstrap";

interface ITextFieldProps {
  name: string;
  label?: string;
  type: BootstrapFormControlProps["type"];
  value?: BootstrapFormControlProps["value"];
  onChange?: BootstrapFormControlProps["onChange"];
  showValidFeedback?: boolean;
  showInvalidFeedback?: boolean;
  validFeedback?: string;
  isValid?: BootstrapFormControlProps["isValid"];
  isInvalid?: BootstrapFormControlProps["isInvalid"];
  error?: string;
}

interface IFormValues {
  [key: string]: any;
}

function Input(props: ITextFieldProps) {
  const formikContext = useFormikContext<IFormValues>();

  const isValid =
    props.isValid ??
    (formikContext.touched[props.name] && !formikContext.errors[props.name]);

  const isInvalid =
    props.isInvalid ??
    (formikContext.touched[props.name] && !!formikContext.errors[props.name]);

  const validFeedbackShown = (props.showValidFeedback ?? false) && isValid;
  const invalidFeedbackShown = (props.showInvalidFeedback ?? true) && isInvalid;
  const feedbackShown = validFeedbackShown || invalidFeedbackShown;

  return (
    <>
      {/* Label */}
      {props.label && <BootstrapForm.Label>{props.label}</BootstrapForm.Label>}

      {/* Input field */}
      <BootstrapForm.Control
        type={props.type}
        name={props.name}
        value={
          props.value ??
          (formikContext.values as { [key: string]: any })[props.name]
        }
        onChange={props.onChange ?? formikContext.handleChange}
        isValid={isValid}
        isInvalid={isInvalid}
        style={!feedbackShown ? { marginBottom: "10px" } : {}}
      />

      {/* Success message when valid */}
      {validFeedbackShown && (
        <BootstrapForm.Control.Feedback style={{ marginBottom: "10px" }}>
          {props.validFeedback}
        </BootstrapForm.Control.Feedback>
      )}

      {/* Error message when invalid */}
      {invalidFeedbackShown && (
        <BootstrapForm.Control.Feedback
          type="invalid"
          style={{ marginBottom: "10px" }}
        >
          {(props.error ?? formikContext.errors[props.name]) as string}
        </BootstrapForm.Control.Feedback>
      )}
    </>
  );
}

export default Input;
