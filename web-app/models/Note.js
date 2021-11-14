import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
    },
    id: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);
export { Note, NoteSchema };
