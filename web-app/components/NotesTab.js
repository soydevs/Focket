import React from "react";

const NotesTab = ({ notesList = [] }) => {
  console.log(notesList);
  return (
    <div style={{ maxHeight: "70vh", overflow: "scroll" }}>
      <h4>{notesList.length} notes added</h4>
      <ol>
        {notesList.map((note) => (
          <li style={{ backgroundColor: note.color }}>{note.text}</li>
        ))}
      </ol>
    </div>
  );
};

export default NotesTab;
