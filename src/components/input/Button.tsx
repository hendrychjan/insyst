import { ReactNode } from "react";
import {
  Button as BootstrapButton,
  ButtonProps as BootstrapButtonProps,
} from "react-bootstrap";

interface IButtonProps {
  type?: BootstrapButtonProps["type"];
  children: ReactNode;
  style?: BootstrapButtonProps["style"];
  variant?: BootstrapButtonProps["variant"];
  onClick?: BootstrapButtonProps["onClick"];
}

function Button(props: IButtonProps) {
  return (
    <BootstrapButton
      onClick={props.onClick}
      variant={props.variant ?? "primary"}
      type={props.type ?? "button"}
      style={props.style ?? { marginBottom: "10px" }}
    >
      {props.children}
    </BootstrapButton>
  );
}

export default Button;
