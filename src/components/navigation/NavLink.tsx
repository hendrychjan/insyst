import BTNav from "react-bootstrap/Nav";
import { Link } from "react-router";

interface NavLinkProps {
  to: string;
  title: string;
}

function NavLink(props: NavLinkProps) {
  return (
    <>
      <BTNav.Link as={Link} to={props.to}>
        {props.title}
      </BTNav.Link>
    </>
  );
}

export default NavLink;
