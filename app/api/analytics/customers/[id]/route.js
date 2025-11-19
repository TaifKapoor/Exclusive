// app/api/analytics/customers/[id]/route.js
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const customerData = await Order.aggregate([
      { $match: { userId: id } },
      {
        $group: {
          _id: '$userId',
          name: { $first: '$shippingAddress.name' },
          email: { $first: '$shippingAddress.email' },
          phone: { $first: '$shippingAddress.phone' },
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' },
          joined: { $min: '$createdAt' },
        },
      },
      {
        $lookup: {
          from: 'orders',
          let: { userId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$userId', '$$userId'] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            {
              $project: {
                orderId: 1,
                total: 1,
                status: 1,
                createdAt: 1,
              },
            },
          ],
          as: 'recentOrders',
        },
      },
      { $unwind: { path: '$recentOrders', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          name: 1,
          email: 1,
          phone: 1,
          totalOrders: 1,
          totalSpent: 1,
          joined: 1,
          recentOrders: {
            $cond: {
              if: { $isArray: '$recentOrders' },
              then: '$recentOrders',
              else: [],
            },
          },
        },
      },
    ]);

    if (customerData.length === 0) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(customerData[0]);
  } catch (error) {
    console.error('Customer detail API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}