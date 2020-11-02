import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const linkSchema = new Schema({
	from: { type: String, requred: true },
  to: { type: String, requred: true, unique: true },
  code: { type: String, requred: true, unique: true },
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
})

export default model('Link', linkSchema);