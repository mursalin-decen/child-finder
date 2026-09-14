import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import MissingChild from '../../../models/MissingChild';
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectToDatabase();

        const updatedChild = await MissingChild.findByIdAndUpdate(
            id,
            { isFound: true },
            { new: true }
        );

        if (!updatedChild) {
            return NextResponse.json(
                { success: false, error: 'রিপোর্টটি পাওয়া যায়নি' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: updatedChild }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে' },
            { status: 500 }
        );
    }
}