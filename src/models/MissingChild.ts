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
  // উদ্ধার হওয়া সংক্রান্ত অতিরিক্ত ফিল্ডসমূহ
  foundLocation?: string;
  foundDate?: string;
  foundCoordinates?: {
    lat: number;
    lng: number;
  };
}

const MissingChildSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    dateMissing: { type: String, required: true },
    description: { type: String, required: true },
    contactNumber: { type: String, required: true },
    imageUrl: { type: String, required: true },
    status: { type: String, enum: ['Missing', 'Found'], default: 'Missing' },
    foundLocation: { type: String },
    foundDate: { type: String },
    foundCoordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.models.MissingChild ||
  mongoose.model<IMissingChild>('MissingChild', MissingChildSchema);