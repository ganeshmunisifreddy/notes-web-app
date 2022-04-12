import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Note from "../components/Note";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import NoteModal from "../components/NoteModal";

const Home: NextPage = () => {
  const [notes, setNotes] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [noteIndex, setNoteIndex] = useState<any>();

  const closeModal = () => {
    setOpen(false);
    setNoteIndex(null);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleSave = (note: any) => {
    let newNotes = [...notes];
    if (noteIndex === 0 || noteIndex) {
      newNotes[noteIndex] = note;
    } else {
      let newNote = {
        id: uuid(),
        ...note,
      };
      newNotes.unshift(newNote);
    }
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    closeModal();
  };

  const handleEdit = (noteIndex: number) => {
    setOpen(true);
    let oldNotes = [...notes];
    let note = oldNotes[noteIndex];
    setNoteIndex(noteIndex);
  };

  const handleDelete = (event: any, noteIndex: number) => {
    event.stopPropagation();
    let oldNotes = [...notes];
    oldNotes.splice(noteIndex, 1);
    setNotes(oldNotes);
    localStorage.setItem("notes", JSON.stringify(oldNotes));
  };

  useEffect(() => {
    let notes = localStorage.getItem("notes");
    if (notes) {
      let parsedNotes = JSON.parse(notes);
      setNotes(parsedNotes);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Notes | Nine Technology</title>
        <meta name="description" content="Notes app by Nine Technology" />
      </Head>

      <Header handleModal={openModal} />

      <main className={styles.main}>
        {notes.length > 0 && (
          <div className={styles.notes}>
            {notes.map((note: any, index: number) => (
              <Note
                note={note}
                key={note.id}
                index={index}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
        {notes.length === 0 && (
          <div className={styles.notFound}>Notes you add appear here</div>
        )}
      </main>
      {open && (
        <NoteModal
          open={open}
          note={notes[noteIndex]}
          onClose={closeModal}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default Home;
