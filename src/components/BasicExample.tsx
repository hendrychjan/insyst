import BTForm from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "./input/Input";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

function BasicExample() {
  return (
    <BTForm>
      <Input />
    </BTForm>
  );
}

export default BasicExample;
