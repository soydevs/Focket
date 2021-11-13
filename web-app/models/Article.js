const mongoose = require("mongoose");
const { Schema } = mongoose;

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
      default: [],
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", ArticleSchema);
module.exports = { Article };
