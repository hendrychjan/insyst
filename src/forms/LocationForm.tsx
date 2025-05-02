import * as yup from "yup";
import Form, { IFormRef } from "../components/input/Form";
import Input from "../components/input/Input";
import Button from "../components/input/Button";
import { forwardRef, useImperativeHandle, useRef } from "react";

export class LocationFormValues {
  title: string = "";
  description?: string;
  parent?: string;
}

interface ILocationFormProps {
  initialValues: LocationFormValues;
  onSubmit: (values: LocationFormValues) => void;
  submitErrorMessage?: string;
  disableDefaultSubmitButton?: boolean;
}

export interface ILocationFormRef {
  submitForm: () => void;
}

const LocationForm = forwardRef<ILocationFormRef, ILocationFormProps>((props, ref) => {
  const formRef = useRef<IFormRef>(null);

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formRef.current?.submitForm();
    },
  }));

  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string(),
  });

  return (
    <Form
      ref={formRef}
      initialValues={props.initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
      submitErrorMessage={props.submitErrorMessage}
    >
      <Input type="text" name="title" label="Název" />
      <Input type="text" name="description" label="Popis" />
      {props.disableDefaultSubmitButton === false && (
        <Button type="submit">Vytvořit</Button>
      )}
    </Form>
  );
});

export default LocationForm;