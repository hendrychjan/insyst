import Form from "../components/input/Form";
import * as yup from "yup";
import Input from "../components/input/Input";
import Button from "../components/input/Button";

export class LoginFormValues {
  name: string = "";
  password: string = "";
}

interface ILoginFormProps {
  initialValues: LoginFormValues
}

function LoginForm(props: ILoginFormProps) {
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required(),
  })

  function onSubmit(values: any) {
    console.log("submitting");
    console.log(values);
  }

  return (
    <Form
      initialValues={props.initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Input type="text" name="name" label="Uživatelské jméno" />
      <Input type="text" name="password" label="Heslo" />
      <Button type="submit">Přihlásit se</Button>
    </Form>
  );
};

export default LoginForm;
