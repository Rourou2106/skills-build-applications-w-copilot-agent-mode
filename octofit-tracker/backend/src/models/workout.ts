import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IWorkout>('Workout', workoutSchema);
