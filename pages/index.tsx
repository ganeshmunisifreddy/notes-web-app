import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Note from "../components/Note";
import styles from "../styles/Home.module.css";
import { v4 as uuid } from "uuid";

const Home: NextPage = () => {
  const [notes, setNotes] = useState<any>([]);
  const [text, setText] = useState("");

  const handleChange = (e: any) => {
    let value = e.target.value;
    setText(value);
  };

  const handleSave = () => {
    let newNotes = [...notes];
    if (text.length) {
      let newNote = {
        id: uuid(),
        content: text,
      };
      newNotes.push(newNote);
      setNotes(newNotes);
      localStorage.setItem("notes", JSON.stringify(newNotes));
      setText("");
    }
  };

  useEffect(() => {
    let notes = localStorage.getItem("notes");
    if (notes) {
      setNotes(JSON.parse(notes));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Notes | Nine Technology</title>
        <meta name="description" content="Notes app by Nine Technology" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <textarea
              className={styles.editInput}
              value={text}
              onChange={handleChange}
            ></textarea>
          </div>
          <button onClick={handleSave} disabled={!text.length}>
            Save
          </button>
        </div>
        {notes.length > 0 && (
          <div className={styles.notes}>
            {notes.map((note: any, index: number) => (
              <Note note={note} key={note.id} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
