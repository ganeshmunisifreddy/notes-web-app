import React, { useEffect, useState, useRef } from "react";
import Modal from "../components/Modal";
import styles from "../styles/Note.module.css";

type Props = {};

const defaultNote = {
  title: "",
  content: "",
  pinned: false,
};

const EditNote = (props: any) => {
  const { open, onClose, note: eNote, handleSave } = props;
  const [note, setNote] = useState<any>({ ...defaultNote });

  useEffect(() => {
    if (eNote) {
      setNote(eNote);
    }
  }, [eNote]);

  const handleChange = (e: any, type: string) => {
    let value = e.target.value;
    let newNote = { ...note };
    if (type === "title") newNote.title = value;
    if (type === "content") newNote.content = value;
    setNote(newNote);
  };

  // const handleApply = () => {
  //   handleSave(note);
  // };

  const handleClose = () => {
    if (note.title.length || note.content.length) {
      handleSave(note);
    }
    onClose();
  };

  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          <input
            className={styles.titleInput}
            placeholder="Title"
            value={note.title}
            onChange={(e: any) => handleChange(e, "title")}
          />
        </div>
        <div className={styles.modalContent}>
          <textarea
            ref={inputRef}
            placeholder="Please enter your note..."
            className={styles.editArea}
            value={note.content}
            onChange={(e: any) => handleChange(e, "content")}
          ></textarea>
        </div>
        {/* <div className={styles.modalActions}>
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
        </div> */}
      </div>
    </Modal>
  );
};

export default EditNote;
