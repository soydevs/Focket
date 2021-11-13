import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { useState } from "react";
import Note from "./Note";

const NotesTab = ({ notesList = [], handleUpdateArticle }) => {
  const [notes, setNotes] = useState(notesList);

  const handleAddNote = () => {
    setNotes((notes) => [
      ...notes,
      { id: Math.random(), text: "", addedTime: new Date().getTime() },
    ]);
    handleUpdateArticle("notes", notes);
  };

  const handleDelete = (id) => {
    console.log(id);
    setNotes((currNotes) => currNotes.filter((note) => note.id !== id));
    handleUpdateArticle("notes", notes);
  };

  const handleSave = (updatedNote) => {
    setNotes((currNotes) =>
      currNotes.map((note) => {
        if (note.id === updatedNote.id) return updatedNote;
        return note;
      })
    );
    handleUpdateArticle("notes", notes);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ marginLeft: 10 }}>{notes.length} notes added</h4>
        <IconButton onClick={handleAddNote}>
          <AddIcon />
        </IconButton>
      </div>
      <div style={{ maxHeight: "60vh", overflow: "auto" }}>
        <ol>
          {notes.map((note) => (
            <li style={{ marginBottom: 5 }} key={note.addedTime}>
              <Note
                note={note}
                handleDelete={handleDelete}
                handleSave={handleSave}
              />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default NotesTab;
