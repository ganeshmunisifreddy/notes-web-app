import React from "react";
import styles from "../styles/Note.module.css";

type Props = {
  note: any;
};

const Note = (props: Props) => {
  const { note } = props;
  return (
    <div key={"note-" + note.id} className={styles.note}>
      <div className={styles.content}>{note.content}</div>
      <div className={styles.actions}></div>
    </div>
  );
};

export default Note;
