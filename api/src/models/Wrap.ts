import mongoose, { Document, Schema } from 'mongoose';
import type { RelationshipProfile, WrappedInsight } from '../types/relationship';

export interface IWrap extends Document {
  creatorName: string;
  deviceId: string;
  chatName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  analytics: RelationshipProfile;
  relationship?: WrappedInsight;
  error?: string;
  analyticsVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

const WrapSchema: Schema = new Schema(
  {
    creatorName: { type: String, required: true, trim: true },
    deviceId: { type: String, required: true, index: true },
    chatName: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
      required: true,
    },
    analytics: { type: Schema.Types.Mixed, required: true },
    relationship: { type: Schema.Types.Mixed },
    error: { type: String },
    analyticsVersion: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

export const Wrap = mongoose.model<IWrap>('Wrap', WrapSchema);
