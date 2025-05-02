import * as yup from "yup";
import Form from "../components/input/Form";
import Input from "../components/input/Input";
import Button from "../components/input/Button";

export class LoginFormValues {
  name: string = "";
  password: string = "";
}

interface ILoginFormProps {
  initialValues: LoginFormValues;
  onSubmit: (values: LoginFormValues) => void;
  submitErrorMessage?: string;
}

export default function LoginForm(props: ILoginFormProps) {
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required(),
  });

  return (
    <Form
      initialValues={props.initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
      submitErrorMessage={props.submitErrorMessage}
    >
      <Input type="text" name="name" label="Uživatelské jméno" />
      <Input type="password" name="password" label="Heslo" />
      <Button type="submit">Přihlásit se</Button>
    </Form>
  );
}
