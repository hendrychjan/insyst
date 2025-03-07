import BTContainer from "react-bootstrap/Container";
import BTNav from "react-bootstrap/Nav";
import BTNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router";
import NavLink from "./NavLink";

function Navbar() {
  return (
    <BTNavbar fixed="top" expand="lg" className="bg-body-tertiary">
      <BTContainer>
        <BTNavbar.Brand as={Link} to="/">
          <img
            alt=""
            src="/logo-64.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Insyst
        </BTNavbar.Brand>
        <BTNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BTNavbar.Collapse id="basic-navbar-nav">
          <BTNav className="me-auto">
            <NavLink to="/" title="Domů" />
          </BTNav>
          <div className="flex-grow-1"></div> {/* Spacer */}
          <BTNav className="me-auto">
            <NavLink to="/signin" title="Přihlásit se" />
            <NavLink to="/signup" title="Registrovat" />
          </BTNav>
        </BTNavbar.Collapse>
      </BTContainer>
    </BTNavbar>
  );
}

export default Navbar;
