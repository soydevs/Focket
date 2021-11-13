import { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";

const Note = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVal, setEditedVal] = useState(note.text);

  const handleSave = () => {
    setIsEditing(false);
    console.log(editedVal);
  };
  const handleDelete = () => {
    console.log("deleting note: " + note.id);
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <span>{note.text}</span>
          <span style={{ marginLeft: 5 }}>
            <IconButton onClick={() => setIsEditing(true)}>
              <ModeEditIcon fontSize='small' />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon fontSize='small' />
            </IconButton>
          </span>
        </div>
      ) : (
        <div>
          <textarea
            name='note'
            id={note.id}
            cols='30'
            rows='7'
            value={editedVal}
            onChange={(e) => setEditedVal(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
