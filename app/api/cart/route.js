// app/api/cart/route.js
import { connectDB } from '@/lib/db';
import Cart from '@/models/Cart';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';


export async function GET() {
  try {
    await connectDB();
    const user = await getUserFromToken();
    const cookieStore = await cookies();
    const guestId = cookieStore.get('guestId')?.value;

    console.log('GET /api/cart → user:', user?.userId, 'guestId:', guestId);

    const cart = await Cart.findOne(
      user ? { userId: user.userId } : { guestId }
    ).lean();

    if (!cart || !cart.items || cart.items.length === 0) {
      console.log('Cart is empty');
      return NextResponse.json([]);
    }

    console.log('Cart found:', cart);
    return NextResponse.json(cart.items || []);
  } catch (error) {
    console.error('GET /api/cart error:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json(
        { error: "Login required" },
        { status: 401 }
      );
    }
    
   
    const cookieStore = await cookies();
    const existingGuestId = cookieStore.get('guestId')?.value;
    const guestId = existingGuestId || crypto.randomUUID();
    
    const { productId, quantity = 1 } = await request.json();

    console.log('POST /api/cart →', { user: user?.userId, guestId, productId, quantity });

    let cart = await Cart.findOne(
      user ? { userId: user.userId } : { guestId }
    );

    if (!cart) {
      cart = new Cart({
        userId: user?.userId,
        guestId: !user ? guestId : undefined,
        items: []
      });
    }

    const item = cart.items.find(i => i.productId === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    const response = NextResponse.json(cart.items);
    
   
    if (!user && !existingGuestId) {
      response.cookies.set('guestId', guestId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      });
    }

    return response;
  } catch (error) {
    console.error('POST /api/cart error:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const user = await getUserFromToken();
    const cookieStore = await cookies();
    const guestId = cookieStore.get('guestId')?.value;

    
    let body = {};
    const contentType = request.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      try {
        const text = await request.text();
        if (text && text.trim()) {
          body = JSON.parse(text);
        }
      } catch (e) {
        console.error('JSON parse error:', e);
      }
    }

    const { productId, clearAll } = body;

    console.log('DELETE /api/cart →', { productId, clearAll, user: user?.userId, guestId });

    const cart = await Cart.findOne(
      user ? { userId: user.userId } : { guestId }
    );

    if (!cart) {
      console.log('Cart not found');
      return NextResponse.json({ success: true, items: [] });
    }

  
    if (clearAll) {
      cart.items = [];
      await cart.save();
      console.log('Cart cleared completely');
      return NextResponse.json({ success: true, items: [] });
    }

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(i => i.productId !== productId);

    if (cart.items.length === initialLength) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    await cart.save();
    console.log('Item removed');

    return NextResponse.json({ success: true, items: cart.items });

  } catch (error) {
    console.error('DELETE /api/cart error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}