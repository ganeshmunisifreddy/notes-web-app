import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Note from "../components/Note";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import NoteModal from "../components/NoteModal";
import NotFound from "../components/NotFound";
import { AnimatePresence, motion } from 'framer-motion';
import noteStyles from "../styles/Note.module.css";

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
    newNotes.sort((a: any, b: any) => {
      return Number(b.pinned) - Number(a.pinned);
    });
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    closeModal();
  };

  const handleEdit = (noteIndex: number) => {
    setOpen(true);
    setNoteIndex(noteIndex);
  };

  const handleDelete = (noteIndex: number) => {
    let oldNotes = [...notes];
    oldNotes.splice(noteIndex, 1);
    setNotes(oldNotes);
    localStorage.setItem("notes", JSON.stringify(oldNotes));
  };

  const handlePin = (noteIndex: number) => {
    let oldNotes = [...notes];
    //oldNotes[noteIndex].pinned = !oldNotes[noteIndex].pinned;
    let item = {
      ...oldNotes[noteIndex],
    };
    item.pinned = !item.pinned;
    oldNotes.splice(noteIndex, 1);
    oldNotes.unshift(item);
    oldNotes.sort((a: any, b: any) => {
      return Number(b.pinned) - Number(a.pinned);
    });
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
    <div className={styles.rootContainer}>
      <Head>
        <title>Notes | Nine Technology</title>
        <meta name="description" content="Notes app by Nine Technology" />
      </Head>

      <Header handleModal={openModal} />

      <main className={styles.main}>
        {notes.length > 0 && (
          <div className={styles.notes}>
            <AnimatePresence initial={false}>
              {notes.map((note: any, index: number) => (
                <motion.div
                  key={note.id}
                  className={noteStyles.noteWrapper}
                  initial={{ opacity: 0, y: 30, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                  transition={{
                    type: "tween"
                  }}
                  layout
                >
                  <Note
                    note={note}
                    index={index}
                    handleEdit={handleEdit}
                    handlePin={handlePin}
                    handleDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        {notes.length === 0 && <NotFound text="Notes you add appear here" />}
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
