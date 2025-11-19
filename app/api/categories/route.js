// app/api/categories/route.js
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({})
      .select('name slug image count')
      .lean();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}