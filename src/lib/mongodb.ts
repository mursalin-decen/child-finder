import dns from 'dns';
import mongoose from 'mongoose';

// Google & Cloudflare DNS ওভাররাইড (ECONNREFUSED / querySrv ফিক্স করার জন্য)
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    console.log('DNS setServers failed:', e);
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        }).then((mongooseInstance) => {
            return mongooseInstance;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}