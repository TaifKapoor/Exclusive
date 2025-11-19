// app/api/analytics/customers/route.js
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const customers = await Order.aggregate([
      
      { $match: { userId: { $ne: null, $exists: true } } },

      {
        $group: {
          _id: '$userId',
          name: { $first: '$shippingAddress.name' },
          email: { $first: '$shippingAddress.email' },
          phone: { $first: '$shippingAddress.phone' },
          orders: { $sum: 1 },
          totalSpent: { $sum: '$total' },
        },
      },

      { $sort: { totalSpent: -1 } },

      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1,
          orders: 1,
          totalSpent: 1,
        },
      },
    ]);

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Customers API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}