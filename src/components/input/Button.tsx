import { ReactNode } from "react";
import {
  Button as BootstrapButton,
  ButtonProps as BootstrapButtonProps,
} from "react-bootstrap";

interface IButtonProps {
  type?: BootstrapButtonProps["type"];
  children: ReactNode;
}

function Button(props: IButtonProps) {
  return (
    <BootstrapButton type={props.type ?? "button"} style={{marginBottom: "10px"}}>
      {props.children}
    </BootstrapButton>
  );
}

export default Button;
