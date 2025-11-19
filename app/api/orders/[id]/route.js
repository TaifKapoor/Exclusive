// app/api/orders/[id]/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    console.log('GET /api/orders/[id] → Searching for order:', id);

   
    const order = await Order.findOne({ orderId: id }).lean();

    if (!order && mongoose.Types.ObjectId.isValid(id)) {
      order = await Order.findById(id).lean();
    }

    if (!order) {
      console.log(' Order not found');
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    console.log('Order found:', order);

    if (!order.items || order.items.length === 0) {
      console.log(' Order has no items');
      return NextResponse.json(order);
    }


    const productIds = order.items.map(item => item.productId);
    console.log('Fetching products for IDs:', productIds);

    
    const products = await Product.find({ id: { $in: productIds } }).lean();

    
    const enrichedItems = order.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        name: product?.name || 'Unknown Product',
        image: product?.images?.[0] || '/placeholder.png',
        price: product?.price || 0,
      };
    });


    const enrichedOrder = { ...order, items: enrichedItems };

    return NextResponse.json(enrichedOrder);
  } catch (error) {
    console.error('GET /api/orders/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



// app/api/orders/[id]/route.js
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; 
    const { status } = await request.json();

    const valid = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!valid.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: id }, 
      { status },
      { new: true }
    );

    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const order = await Order.findOneAndDelete({ orderId: params.id });
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    return NextResponse.json({ message: 'Order deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}