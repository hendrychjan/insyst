import logo128 from "/logo-128.png";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

function HomePage() {
  let navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 text-center shadow-lg">
        <Card.Body>
          <Card.Img
            src={logo128}
            alt="App Logo"
            className="mb-3"
            style={{ width: "100px" }}
          />
          <Card.Title className="fs-1">Insyst</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Inventární systém
          </Card.Subtitle>
          <br />
          <Button onClick={() => navigate("login")}>Přihlásit se</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HomePage;
