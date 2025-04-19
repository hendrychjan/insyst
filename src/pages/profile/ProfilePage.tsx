import { Container } from "react-bootstrap";
import { useAuth } from "../../providers/AuthProvider";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <Container>
      <h1>Profil</h1>
      <p>
        Jste přihlášeni jako <b>{user?.name}</b>
      </p>
    </Container>
  );
}

export default ProfilePage;
