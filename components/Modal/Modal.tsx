import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";

type Props = {
  children: any;
  open: boolean;
  onClose: any;
};

const Modal = (props: Props) => {
  const { children, open, onClose } = props;

  const modalRef = useRef<any>(null);

  const preventClose = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
  };

  if (!open) {
    return null;
  }

  return (
    <div className={styles.root} onClick={onClose}>
      <div className={styles.container} onClick={preventClose} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
