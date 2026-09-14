import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { connectToDatabase } from '../../../lib/mongodb';
import MissingChild from '../../../models/MissingChild';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const name = formData.get('name') as string;
        const age = formData.get('age') as string;
        const location = formData.get('location') as string;
        const dateMissing = formData.get('dateMissing') as string;
        const description = formData.get('description') as string;
        const contactNumber = formData.get('contactNumber') as string;
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'Image is required' }, { status: 400 });
        }

        console.log('1. Step 1: File converting to base64...');
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

        console.log('2. Step 2: Uploading to Cloudinary...');
        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
            folder: 'child_finder_reports',
        });

        console.log('3. Step 3: Connecting to MongoDB...');
        await connectToDatabase();

        console.log('4. Step 4: Saving to Database...');
        const newReport = await MissingChild.create({
            name,
            age: Number(age),
            location,
            dateMissing,
            description,
            contactNumber,
            imageUrl: uploadResponse.secure_url,
        });

        return NextResponse.json({ message: 'Report submitted successfully!', data: newReport }, { status: 201 });
    } catch (error: any) {
        console.error('SERVER ERROR LOG:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}