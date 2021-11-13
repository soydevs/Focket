import dbConnect from "../../../lib/connect";
import { Note, Article } from '../../../models';

export default async function handler(req, res) {
    const {
      query: { aid },
      method,
    } = req
  
    await dbConnect()
  
    switch (method) {
      case 'POST':
        try {
          const note = new Note(req.body);
          await note.save();
          const article  = await Article.findByIdAndUpdate(aid, { $push: { 'notes': note._id } }, { new: true }).lean().exec()
         res.status(200).json({ success: true, data: article })
      } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
      }
      break;
      case 'PATCH':
        try {
          const note = await Note.findOneAndUpdate({ uid }, req.body, { new:true }).lean().exec()
          res.status(200).json({ success: true, data: note })
        } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
      }
      case 'DELETE':
        try {
          const note  = await Note.findOneAndDelete({uid}).lean().exec()
          const article  = Article.findByIdAndUpdate(aid, { $pullAll: {'notes': [note._id] } }).lean().exec()
          res.status(200).json({ success: true, data:article })
        } catch (error) {
        res.status(400).json({ success: false, message: error.message })
      }
      default:
        res.status(400).json({ success: false, message:'Invalid' })
        break
    }
  }