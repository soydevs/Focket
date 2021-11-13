import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import Note from "./Note";

const NotesTab = ({ notesList = [] }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ marginLeft: 10 }}>{notesList.length} notes added</h4>
        <IconButton>
          <AddIcon />
        </IconButton>
      </div>
      <div style={{ maxHeight: "60vh", overflow: "auto" }}>
        <ol>
          {notesList.map((note) => (
            <li style={{ marginBottom: 5 }} key={note.addedTime}>
              <Note note={note} />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default NotesTab;
