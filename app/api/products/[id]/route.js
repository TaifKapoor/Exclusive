// app/api/products/[id]/route.js
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const product = await Product.findOne({ id: params.id }).lean(); 

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Fetch product error:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}



export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();

 
    if (!body.name || !body.price || !body.images || body.images.length === 0 || !body.category) {
      return NextResponse.json(
        { error: 'Name, Price, Image, Category required' },
        { status: 400 }
      );
    }

    body.images = Array.isArray(body.images) ? body.images : [body.images];
    delete body.image;


    const updatedProduct = await Product.findOneAndUpdate(
      { id: params.id },
      body,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Update failed', details: error.message },
      { status: 500 }
    );
  }
}



export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const deletedProduct = await Product.findOneAndDelete({ id: params.id });

    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Delete failed', details: error.message },
      { status: 500 }
    );
  }
}