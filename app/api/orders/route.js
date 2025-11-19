// app/api/orders/route.js
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import Cart from '@/models/Cart'; 
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';



// app/api/orders/route.js 
export async function GET() {
  try {
    await connectDB();

    
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();
      

    return NextResponse.json(orders);
  } catch (error) {
    console.error('GET /api/orders error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    console.log('Received order data:', body);

    
    const { items, totalAmount, shippingAddress, paymentMethod = 'cod' } = body;

    
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log(' Invalid items');
      return NextResponse.json({ error: 'Cart items are required' }, { status: 400 });
    }

    
    if (!shippingAddress || 
        !shippingAddress.name || 
        !shippingAddress.phone || 
        !shippingAddress.email ||
        !shippingAddress.address ||
        !shippingAddress.city ||
        !shippingAddress.zipCode) {
      console.log(' Incomplete shipping address:', shippingAddress);
      return NextResponse.json({ error: 'Complete shipping address required' }, { status: 400 });
    }

  
    if (!totalAmount || totalAmount <= 0) {
      console.log(' Invalid total amount:', totalAmount);
      return NextResponse.json({ error: 'Invalid total amount' }, { status: 400 });
    }

   
    let orderId;
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      const lastOrder = await Order.findOne().sort({ createdAt: -1 }).select('orderId');
      const nextNum = lastOrder && lastOrder.orderId ? parseInt(lastOrder.orderId.slice(3)) + 1 : 1;
      orderId = `ORD${String(nextNum).padStart(3, '0')}`;

      const exists = await Order.findOne({ orderId });
      if (!exists) break;

      attempts++;
    }

    if (attempts >= maxAttempts) {
      console.log(' Failed to generate unique order ID');
      return NextResponse.json({ error: 'Failed to generate unique order ID' }, { status: 500 });
    }

    console.log(' Generated order ID:', orderId);

    
    const cookieStore = await cookies();
    const guestId = cookieStore.get('guestId')?.value;

    
    const order = new Order({
      orderId,
      userId: 'guest', 
      guestId: guestId,
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity, 
        image: item.image
      })),
      totalAmount, 
      shippingAddress,
      paymentMethod,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await order.save();
    console.log('Order saved:', order.orderId);

    // CLEAR CART
    if (guestId) {
      try {
        const result = await Cart.updateOne(
          { guestId },
          { $set: { items: [] } }
        );
        console.log(' Cart cleared:', result.modifiedCount);
      } catch (cartError) {
        console.error(' Cart clear error (ignored):', cartError);
       
      }
    }

    
    return NextResponse.json({
      success: true,
      message: 'Order placed successfully',
      order: {
        orderId: order.orderId,
        _id: order._id.toString(),
        totalAmount: order.totalAmount,
        status: order.status,
        items: order.items,
        shippingAddress: order.shippingAddress,
        createdAt: order.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error(' POST /api/orders ERROR:', error);
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}