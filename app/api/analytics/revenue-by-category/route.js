// app/api/analytics/revenue-by-category/route.js
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const result = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'shipped'] } } }, 
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: 'id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.category',
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
        },
      },
      { $sort: { revenue: -1 } },
    ]);

    
    const revenueByCategory = {};
    result.forEach(item => {
      revenueByCategory[item._id || 'Unknown'] = item.revenue;
    });

    return NextResponse.json(revenueByCategory);
  } catch (error) {
    console.error('Revenue API error:', error);
    return NextResponse.json({}, { status: 500 });
  }
}