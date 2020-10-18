import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
	email: { type: String, requred: true, unique: true },
	password: { type: String, requred: true },
	links: [{ type: Schema.Types.ObjectId, ref: 'Link' }]
})

export default model('User', userSchema);