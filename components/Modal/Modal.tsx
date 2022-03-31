import React from "react";
import styles from "./Modal.module.css";

type Props = {
  children: any;
  open: boolean;
  onClose: any;
};

const Modal = (props: Props) => {
  const { children, open, onClose } = props;

  const handleClose = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
  };

  if (!open) {
    return null;
  }
  return (
    <div className={styles.root} onClick={onClose}>
      <div className={styles.container} onClick={handleClose}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
