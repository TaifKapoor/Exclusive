// app/api/auth/me/route.js
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const userData = await getUserFromToken();
    if (!userData) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await User.findById(userData.userId).select('name email role');
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('ME route error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}