import mongoose, { Schema, Document } from 'mongoose';

export interface IMissingChild extends Document {
  name: string;
  age: number;
  location: string;
  dateMissing: string;
  description: string;
  contactNumber: string;
  imageUrl: string;
  status: 'Missing' | 'Found';
  createdAt: Date;
}

const MissingChildSchema = new Schema<IMissingChild>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  dateMissing: { type: String, required: true },
  description: { type: String, required: true },
  contactNumber: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { type: String, enum: ['Missing', 'Found'], default: 'Missing' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.MissingChild || mongoose.model<IMissingChild>('MissingChild', MissingChildSchema);