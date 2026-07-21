import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  points: number;
  streak: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true, unique: true },
  points: { type: Number, required: true },
  streak: { type: Number, required: true },
  rank: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
