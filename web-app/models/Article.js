import mongoose, { Mongoose, Schema } from "mongoose";
import { NoteSchema } from "./Note";

const ArticleSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      required: false,
      type: String,
    },
    tags: {
      required: true,
      type: [String],
      default: [],
    },
    notes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    description: {
      required: false,
      type: String,
    },
    imgUrl: {
      required: false,
      default: "https://picsum.photos/200",
      type: String,
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);
export { Article };
