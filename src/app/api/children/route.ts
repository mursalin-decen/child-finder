import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import MissingChild from '../../../models/MissingChild';

export async function GET() {
    try {
        await connectToDatabase();
        // সর্বশেষ তৈরি হওয়া রিপোর্ট আগে দেখানোর জন্য sort({ createdAt: -1 }) ব্যবহার করা হয়েছে
        const children = await MissingChild.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: children }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: 'ডাটা লোড করতে ব্যর্থ হয়েছে' },
            { status: 500 }
        );
    }
}