import { Container } from "react-bootstrap";
import LoginForm, { LoginFormValues } from "../../forms/LoginForm";

function LoginPage() {
  return (
    <Container>
      <h1>Přihlášení</h1>
      <LoginForm initialValues={new LoginFormValues()} />
    </Container>
  );
}

export default LoginPage;
