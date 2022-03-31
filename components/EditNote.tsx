import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Note.module.css";

type Props = {};

const defaultNote = {
  content: "",
};

const EditNote = (props: any) => {
  const { onClose, note: eNote, handleSave } = props;
  const [note, setNote] = useState<any>({ ...defaultNote });

  useEffect(() => {
    if (eNote) {
      setNote(eNote);
    }
  }, [eNote]);

  const handleChange = (e: any) => {
    let value = e.target.value;
    let newNote = { ...note };
    newNote.content = value;
    setNote(newNote);
  };

  const handleApply = () => {
    handleSave(note);
  };

  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.editContainer}>
      <h3 className={styles.modalTitle}>
        {note.id ? "Edit Note" : "Add Note"}
      </h3>
      <textarea
        ref={inputRef}
        placeholder="Please enter your note..."
        className={styles.editInput}
        value={note.content}
        onChange={handleChange}
      ></textarea>
      <div className={styles.modalActions}>
        <button
          onClick={onClose}
          className="button__primary"
          style={{ marginRight: 16 }}
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="button__primary"
          disabled={!note.content.length}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditNote;
