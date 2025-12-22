import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import styles from "./Backdrop.module.css";

interface BackdropProps {
  onClick: () => void;
}

export default function Backdrop({ onClick }: BackdropProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const backdropRoot = document.getElementById("backdrop-hook");
  const content = (
    <div
      className={`${styles.backdrop} ${
        isVisible ? styles.backdropVisible : ""
      }`}
      onClick={onClick}
    />
  );

  return backdropRoot ? ReactDOM.createPortal(content, backdropRoot) : null;
}
