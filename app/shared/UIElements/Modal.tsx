import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import Backdrop from "./Backdrop";
import styles from "./Modal.module.css";

interface ModalOverlayProps {
  className?: string;
  style?: React.CSSProperties;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
  header?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  show?: boolean;
  isClosing?: boolean;
}

function ModalOverlay(props: ModalOverlayProps) {
  const content = (
    <div
      className={`${styles.modal} ${props.className || ""} ${
        props.show && !props.isClosing ? styles.modalOpen : styles.modalClosed
      }`}
      style={props.style}
    >
      <header className={`${styles.modalHeader} ${props.headerClass || ""}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`${styles.modalContent} ${props.contentClass || ""}`}>
          {props.children}
        </div>
        <footer className={`${styles.modalFooter} ${props.footerClass || ""}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  const modalRoot = document.getElementById("modal-hook");
  return modalRoot ? ReactDOM.createPortal(content, modalRoot) : null;
}

interface ModalProps extends ModalOverlayProps {
  show: boolean;
  onCancel: () => void;
}

export default function Modal(props: ModalProps) {
  const [shouldRender, setShouldRender] = useState(props.show);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (props.show) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      // Trigger closing animation
      setIsClosing(true);
      // Delay unmounting to allow exit animation
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [props.show, shouldRender]);

  if (!shouldRender) return null;

  return (
    <>
      <Backdrop onClick={props.onCancel} show={props.show} />
      <ModalOverlay {...props} isClosing={isClosing} />
    </>
  );
}
