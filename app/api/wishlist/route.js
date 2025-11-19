// app/api/wishlist/route.js
import { connectDB } from '@/lib/db';
import Wishlist from '@/models/Wishlist';
import Product from '@/models/Product';
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


export async function GET() {
  try {
    await connectDB();
    
    const user = await getUserFromToken();
    const cookieStore = await cookies();
    const guestId = cookieStore.get('guestId')?.value;

    console.log(' Fetching wishlist for:', user ? `User: ${user.userId}` : `Guest: ${guestId}`);


    const wishlist = await Wishlist.findOne(
      user ? { userId: user.userId } : { guestId }
    );

    if (!wishlist || !wishlist.productIds || wishlist.productIds.length === 0) {
      return NextResponse.json([]);
    }


    const products = await Product.find({
      id: { $in: wishlist.productIds }
    });

    
    const formattedProducts = products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.images?.[0] || p.image || '/placeholder.jpg',
      rating: p.rating || 4.5,
      reviews: p.reviews || 0,
      discount: p.discount || 0
    }));

    console.log(' Wishlist products found:', formattedProducts.length);

    return NextResponse.json(formattedProducts);

  } catch (error) {
    console.error(' Wishlist GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    await connectDB();

    const user = await getUserFromToken();
    const cookieStore = await cookies();
    let guestId = cookieStore.get('guestId')?.value;


    if (!user && !guestId) {
      guestId = crypto.randomUUID();
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    let wishlist = await Wishlist.findOne(
      user ? { userId: user.userId } : { guestId }
    );

    if (!wishlist) {
      wishlist = new Wishlist({
        userId: user?.userId,
        guestId: !user ? guestId : undefined,
        productIds: []
      });
    }


    if (!wishlist.productIds.includes(productId)) {
      wishlist.productIds.push(productId);
      await wishlist.save();
    }

    const response = NextResponse.json({
      success: true,
      message: 'Added to wishlist',
      productIds: wishlist.productIds
    });

    
    if (!user && guestId && !cookieStore.get('guestId')) {
      response.cookies.set('guestId', guestId, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax'
      });
    }
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}


export async function DELETE(request) {
  try {
    await connectDB();

    const user = await getUserFromToken();
    const cookieStore = await cookies();
    const guestId = cookieStore.get('guestId')?.value;

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const wishlist = await Wishlist.findOne(
      user ? { userId: user.userId } : { guestId }
    );

    if (!wishlist) {
      return NextResponse.json(
        { error: 'Wishlist not found' },
        { status: 404 }
      );
    }

   
    wishlist.productIds = wishlist.productIds.filter(id => id !== productId);
    await wishlist.save();

    return NextResponse.json({
      success: true,
      message: 'Removed from wishlist',
      productIds: wishlist.productIds
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  }
}