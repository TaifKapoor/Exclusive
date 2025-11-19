// app/api/analytics/stats/route.js
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const current = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'shipped'] }, createdAt: { $gte: lastMonth } } },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 },
          customers: { $addToSet: '$userId' },
          items: { $sum: { $sum: '$items.quantity' } },
        },
      },
    ]);

    const previous = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'shipped'] }, createdAt: { $lt: lastMonth } } },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 },
          customers: { $addToSet: '$userId' },
          items: { $sum: { $sum: '$items.quantity' } },
        },
      },
    ]);

    const curr = current[0] || { revenue: 0, orders: 0, customers: [], items: 0 };
    const prev = previous[0] || { revenue: 0, orders: 0, customers: [], items: 0 };

    const calcChange = (currVal, prevVal) => {
      if (prevVal === 0) return currVal > 0 ? 100 : 0;
      return Math.round(((currVal - prevVal) / prevVal) * 100);
    };

    return NextResponse.json({
      totalRevenue: Math.round(curr.revenue),
      totalOrders: curr.orders,
      newCustomers: curr.customers.length,
      productsSold: curr.items,
      revenueChange: calcChange(curr.revenue, prev.revenue),
      ordersChange: calcChange(curr.orders, prev.orders),
      customersChange: calcChange(curr.customers.length, prev.customers.length),
      salesChange: calcChange(curr.items, prev.items),
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({
      totalRevenue: 0,
      totalOrders: 0,
      newCustomers: 0,
      productsSold: 0,
      revenueChange: 0,
      ordersChange: 0,
      customersChange: 0,
      salesChange: 0,
    }, { status: 500 });
  }
}