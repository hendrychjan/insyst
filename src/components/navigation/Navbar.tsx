import { useEffect, useRef, useState } from "react";
import BTContainer from "react-bootstrap/Container";
import BTNav from "react-bootstrap/Nav";
import BTNavbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Link } from "react-router";
import NavLink from "./NavLink";
import { useAuth } from "../../providers/AuthProvider";

function Navbar() {
  const { user } = useAuth();
  const navbarRef = useRef<HTMLElement | null>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.setAttribute("data-bs-theme", isDarkMode ? "light" : "dark");
  };

  return (
    <>
      <BTNavbar
        fixed="top"
        expand="lg"
        ref={navbarRef}
      >
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
              {user ? (
                <>
                  <NavLink to="/profile" title={user.name} />
                  <b>
                    <NavLink to="/logout" title="Odhlásit se" />
                  </b>
                </>
              ) : (
                <b>
                  <NavLink to="/login" title="Přihlásit se" />
                </b>
              )}
            </BTNav>
            <Form className="d-flex align-items-center">
              <Form.Check
                type="switch"
                id="theme-switch"
                label={isDarkMode ? "Dark Mode" : "Light Mode"}
                checked={isDarkMode}
                onChange={toggleTheme}
              />
            </Form>
          </BTNavbar.Collapse>
        </BTContainer>
      </BTNavbar>

      {/* Spacer for content below the navbar (otherwise it would get partially hidden below the navbar */}
      <div
        style={{
          height: navbarHeight + "px",
          width: "100vw",
        }}
      ></div>
    </>
  );
}

export default Navbar;
