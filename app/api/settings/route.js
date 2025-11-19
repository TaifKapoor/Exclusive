// app/api/settings/route.js
import { connectDB } from '@/lib/db';
import Settings from '@/models/Settings';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const settings = await Settings.findOne() || {};
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();

    const updated = await Settings.findOneAndUpdate(
      {}, 
      body,
      { upsert: true, new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}