import User from '@/lib/models/User';

export async function GET() {
  await connectDB();
  const customers = await User.find({ role: 'customer' }).select('-password');
  return NextResponse.json(customers);
}