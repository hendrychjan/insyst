import { Nav as BootstrapNav } from "react-bootstrap";
import { Link } from "react-router";

interface INavLinkProps {
  to: string;
  title: string;
}

function NavLink(props: INavLinkProps) {
  return (
    <BootstrapNav.Link as={Link} to={props.to}>
      {props.title}
    </BootstrapNav.Link>
  );
}

export default NavLink;
