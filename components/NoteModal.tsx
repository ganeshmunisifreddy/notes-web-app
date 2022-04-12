import React, { useEffect, useState, useRef } from "react";
import Modal from "../components/Modal";
import styles from "../styles/Note.module.css";

type Props = {};

const defaultNote = {
  title: "",
  content: "",
};

const EditNote = (props: any) => {
  const { open, onClose, note: eNote, handleSave } = props;
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
    <Modal open={open} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h3 className={styles.modalTitle}>
          {note.id ? "Edit Note" : "Add Note"}
        </h3>
        <div className={styles.modalContent}>
          <textarea
            ref={inputRef}
            placeholder="Please enter your note..."
            className={styles.editArea}
            value={note.content}
            onChange={handleChange}
          ></textarea>
        </div>
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
    </Modal>
  );
};

export default EditNote;
