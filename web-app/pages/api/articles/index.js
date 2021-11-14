// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../lib/connect";
import { Article, Note } from "../../../models";
import { getDataFromUrl } from "../../../serverUtils";

export default async function handler(req, res) {
  const { query, method, body } = req;

  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const articles = await Article.find({ query: query || {} })
          .lean()
          .exec();
        res.status(200).json({ success: true, data: articles });
      } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
      }
      break;
    case "POST":
      try {
        const parsedArticle = await getDataFromUrl(body);
        const article = new Article(parsedArticle);
        await article.save();
        console.log("new article saved");
        res.status(201).json({ success: true, data: article });
      } catch (err) {
        console.log("Error in saving: " + err);
        res.status(400).json({ success: false, message: err.message });
      }
      break;
    case "PATCH":
      try {
        console.log(body.url);
        console.log("ok");
        const article = await Article.findOneAndUpdate({ url: body.url }, body)
          .lean()
          .exec();
        console.log("Article udpated");
        res.status(201).json({ success: true, data: article });
      } catch (err) {
        console.log("Error in updating: " + err);
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case "DELETE":
      try {
        const article = await Article.findOneAndDelete({ url });
        for (let i = 0; i < article.notes.length; i++) {
          await Note.findByIdAndDelete(article.notes[i]).exec();
        }
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    default:
      res.status(400).json({ success: false, message: "Invalid" });
      break;
  }
}
