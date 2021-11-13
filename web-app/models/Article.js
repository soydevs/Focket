import mongoose, { Mongoose, Schema } from 'mongoose';
import { NoteSchema } from './Note';

const ArticleSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

const Article = mongoose.models.Article || mongoose.model("Article", ArticleSchema);
export { Article }

