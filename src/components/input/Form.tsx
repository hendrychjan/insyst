import { Alert, Form as BootstrapForm } from "react-bootstrap";
import { Formik, FormikProps } from "formik";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface IFormProps {
  initialValues: any;
  validationSchema: any;
  onSubmit: any;
  submitErrorMessage?: string;
  children: any;
}

export interface IFormRef {
  submitForm: () => void;
}

const Form = forwardRef<IFormRef, IFormProps>((props, ref) => {
  const formikRef = useRef<FormikProps<any>>(null);

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formikRef.current?.handleSubmit();
    },
  }));

  return (
    <Formik
      innerRef={formikRef}
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.onSubmit}
    >
      {({ handleSubmit }) => (
        <BootstrapForm noValidate onSubmit={handleSubmit}>
          {props.children}
          {props.submitErrorMessage && <Alert variant="danger">{props.submitErrorMessage}</Alert>}
        </BootstrapForm>
      )}
    </Formik>
  );
});

export default Form;
