import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Note from "./Note";

const NotesTab = ({ notesList = [] }) => {
  return (
    <div>
      <h4 style={{ marginLeft: 10 }}>{notesList.length} notes added</h4>
      <div style={{ maxHeight: "60vh", overflow: "scroll" }}>
        <ol>
          {notesList.map((note) => (
            <li style={{ marginBottom: 5 }} key={note.addedTime}>
              <Note note={note} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default NotesTab;
