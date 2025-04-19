import { Container } from "react-bootstrap";
import LoginForm, { LoginFormValues } from "../../forms/LoginForm";
import { useAuth } from "../../providers/AuthProvider";
import { useState } from "react";

function LoginPage() {
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>("");
  const { login } = useAuth();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.name, values.password);
    } catch (e: any) {
      setSubmitErrorMessage(e);
    }
  };

  return (
    <Container>
      <h1>Přihlášení</h1>
      <LoginForm initialValues={new LoginFormValues()} onSubmit={onSubmit} submitErrorMessage={submitErrorMessage} />
    </Container>
  );
}

export default LoginPage;
