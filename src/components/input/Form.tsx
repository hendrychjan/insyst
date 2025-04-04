import { Form as BootstrapForm } from "react-bootstrap";
import { Formik } from "formik";

interface IFormProps {
  initialValues: any;
  validationSchema: any;
  onSubmit: any;
  children: any;
}

function Form(props: IFormProps) {
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.onSubmit}
    >
      {({ handleSubmit }) => (
        <BootstrapForm noValidate onSubmit={handleSubmit}>
          {props.children}
        </BootstrapForm>
      )}
    </Formik>
  );
}

export default Form;
