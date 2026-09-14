import mongoose, { Schema, Document } from 'mongoose';

// ==========================================
// ১. TypeScript Interface Section
// (ডাটাবেজের ডকুমেন্টের টাইপ ডেফিনেশন)
// ==========================================
export interface IMissingChild extends Document {
  name: string;
  age: number;
  location: string;
  dateMissing: string;
  description: string;
  contactNumber: string;
  imageUrl: string;
  status: 'Missing' | 'Found'; // 'Missing' অথবা 'Found' স্ট্যাটাস
  createdAt: Date;
}

// ==========================================
// ২. Mongoose Schema Section
// (ডাটাবেজের স্ট্রাকচার ও রুলস ডেফিনেশন)
// ==========================================
const MissingChildSchema = new Schema<IMissingChild>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  dateMissing: { type: String, required: true },
  description: { type: String, required: true },
  contactNumber: { type: String, required: true },
  imageUrl: { type: String, required: true },

  // স্ট্যাটাস ফিল্ড: ডিফল্টভাবে 'Missing' থাকবে
  status: {
    type: String,
    enum: ['Missing', 'Found'],
    default: 'Missing'
  },

  createdAt: { type: Date, default: Date.now },
});

// ==========================================
// ৩. Model Export Section
// (ক্যাশড মডেল থাকলে সেটি নিবে, না থাকলে নতুন মডেল তৈরি করবে)
// ==========================================
export default mongoose.models.MissingChild ||
  mongoose.model<IMissingChild>('MissingChild', MissingChildSchema);