import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import MissingChild from '@/models/MissingChild';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json(); // ফ্রন্টএন্ড থেকে পাওয়া ডাটা
        const { foundLocation, foundDate, lat, lng } = body;

        await connectToDatabase();

        const updateData: any = {
            status: 'Found',
            foundLocation: foundLocation || 'উদ্ধার করা হয়েছে',
            foundDate: foundDate || new Date().toISOString().split('T')[0],
        };

        if (lat && lng) {
            updateData.foundCoordinates = { lat, lng };
        }

        const updatedChild = await MissingChild.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedChild) {
            return NextResponse.json(
                { success: false, error: 'রিপোর্টটি পাওয়া যায়নি' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: updatedChild }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে' },
            { status: 500 }
        );
    }
}