// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../lib/connect"
import { Article, Note }  from '../../../models';

export default async function handler(req, res) {
    const { query, method } = req
  
    await dbConnect()
  
    switch (method) {
      case 'GET':
        try {
          const articles = await Article.find({query}).lean().exec();
          res.status(200).json({ success: true, data: articles })
        } catch (error) {
          res.status(400).json({ success: false, msg: error.message })
        }
        break;
      case 'POST':
        try {
         const article = new Article(req.body);
         await article.save();
          res.status(201).json({ success: true, data: article })
        } catch (error) {
          res.status(400).json({ success: false, message: error.message })
        }
        break;
        case 'PATCH':
            try {
                const article = await Article.findOneAndUpdate({url}, req.body).lean().exec()
                res.status(201).json({ success: true, data: article })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
        break;
        case 'DELETE':
            try {
                const article = await Article.findOneAndDelete({url});
                for(let i=0; i<article.notes.length; i++) {
                    await Note.findByIdAndDelete(article.notes[i]).exec()
                }
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
      default:
        res.status(400).json({ success: false, message:'Invalid' })
        break
    }
  }
