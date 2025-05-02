import { createContext, useContext, useState, ReactNode } from "react";
import { Modal } from "react-bootstrap";
import { AxiosError } from "axios";
import Button from "../components/input/Button";

interface IDialogContext {
  showDialog: (dialog: {
    title?: string;
    content: ReactNode;
    buttons?: { label: string; action: () => void; variant?: string }[];
  }) => void;
  showErrorDialog: (error: any) => void;
}

const DialogContext = createContext<IDialogContext | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [buttons, setButtons] = useState<
    { label: string; action: () => void; variant?: string }[] | null
  >(null);

  const showDialog = ({
    title: dialogTitle,
    content: dialogContent,
    buttons: dialogButtons,
  }: {
    title?: string;
    content?: ReactNode;
    buttons?: { label: string; action: () => void; variant?: string }[];
  }) => {
    setContent(dialogContent || null);
    setTitle(dialogTitle || null);
    setButtons(
      dialogButtons?.map((button) => ({
        ...button,
        action: () => {
          button.action();
          handleClose();
        },
      })) || [{ label: "Zavřít", action: handleClose, variant: "secondary" }]
    );
    setShow(true);
  };

  const showErrorDialog = (error: any) => {
    let errorMessage: string = "An unexpected error occurred.";
    let httpStatus: string | undefined;

    if (error instanceof AxiosError) {
      httpStatus = `Http status: ${error.code}\n`;
      if (error.response?.data) {
        errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(error.response.data);
      }
    } else if (error.message) {
      errorMessage = `Message: ${error.message}\n`;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    showDialog({
      title: "Chyba",
      content: (
        <>
          <p>Omlouváme se, v aplikaci nastala chyba.</p>
          <p>
            {errorMessage && (
              <>
                <b>Podrobnější infromace:</b>
                <br />
                <code>{errorMessage}</code>
                <br />
              </>
            )}
            {httpStatus && (
              <>
                <b>Http status:</b>
                <br />
                <code>{httpStatus}</code>
                <br />
              </>
            )}
          </p>
        </>
      ),
    });
  };

  const handleClose = () => {
    setShow(false);
    setContent(null);
  };

  return (
    <DialogContext.Provider value={{ showDialog, showErrorDialog }}>
      {children}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          {buttons?.map((button, index) => (
            <Button
              key={index}
              variant={button.variant || "secondary"}
              onClick={button.action}
            >
              {button.label}
            </Button>
          ))}
        </Modal.Footer>
      </Modal>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext) as IDialogContext;
}
