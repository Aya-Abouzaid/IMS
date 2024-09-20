// models/task.model.ts
import { Schema, model, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  assignedTo?: string;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  assignedTo: { type: String }
}, { timestamps: true });

const TaskModel = model<ITask>('Task', taskSchema);

export default TaskModel;
export { ITask };
