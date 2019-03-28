import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: { type: 'String', default: 'Anonymous', required: true },
  text: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  post_cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Comment', commentSchema);
