import { useEffect, useRef, useState } from "react";
import BTContainer from "react-bootstrap/Container";
import BTNav from "react-bootstrap/Nav";
import BTNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router";
import NavLink from "./NavLink";

function Navbar() {
  const navbarRef = useRef<HTMLElement | null>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
    <BTNavbar fixed="top" expand="lg" className="bg-body-tertiary" ref={navbarRef}>
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
            <NavLink to="/login" title="Přihlásit se" />
          </BTNav>
        </BTNavbar.Collapse>
      </BTContainer>
    </BTNavbar>

    {/* Spacer for content below the navbar (otherwise it would get partially hidden below the navbar */}
    <div style={{ height: navbarHeight + "px", width: "100vw", backgroundColor: "red"}}></div>
    </>
  );
}

export default Navbar;
