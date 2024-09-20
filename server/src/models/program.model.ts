import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
});

export const ProgramModel = mongoose.model('Program', ProgramSchema);
