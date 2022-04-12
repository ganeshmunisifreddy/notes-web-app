import React from "react";
import styles from "../styles/Note.module.css";
import {
  Pencil,
  Trash,
  Palette,
  Star,
  StarSolid,
  Thumbtack,
  ThumbtackSolid,
} from "react-uicons-beta";

const textEllipsis = (text: string) => {
  let sliceLength: number = 200;
  if (text.length <= sliceLength) {
    return text;
  }
  return text.slice(0, sliceLength) + "...";
};

const Note = (props: any) => {
  const { note, handleDelete, index, handleEdit } = props;

  const handleAction = (event: any) => {
    event.stopPropagation();
  };

  return (
    <div key={"note-" + note.id} className={styles.noteWrapper}>
      <div className={styles.note} onClick={() => handleEdit(index)}>
        <div className={styles.title}>{note.title}</div>
        <div className={styles.container}>
          <textarea
            className={styles.content}
            value={textEllipsis(note.content)}
            readOnly
          ></textarea>
        </div>
        <div className={styles.actions}>
          <div className={styles.iconButton} onClick={handleAction}>
            <Star />
          </div>
          <div className={styles.iconButton} onClick={handleAction}>
            <Thumbtack />
          </div>
          <div className={styles.iconButton} onClick={handleAction}>
            <Palette />
          </div>
          <div
            className={styles.iconButton}
            onClick={(e: any) => handleDelete(e, index)}
          >
            <Trash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
