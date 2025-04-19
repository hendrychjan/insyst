import { Container } from "react-bootstrap";
import { useAuth } from "../../providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, []);

  return (
    <Container>
      <h1>Odhlášení</h1>
      <p>Probíhá odhlašování...</p>
    </Container>
  );
}

export default LogoutPage;
