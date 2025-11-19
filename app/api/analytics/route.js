import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]);
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalCustomers = await User.countDocuments({ role: 'customer' });

  return NextResponse.json({
    revenue: totalRevenue[0]?.total || 0,
    orders: totalOrders,
    products: totalProducts,
    customers: totalCustomers,
  });
}