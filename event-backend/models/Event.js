import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  datetime: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
