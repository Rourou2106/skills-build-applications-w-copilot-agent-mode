import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  calories: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IActivity>('Activity', activitySchema);
