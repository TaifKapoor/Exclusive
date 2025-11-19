// app/api/auth/signup/route.js
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    console.log('📝 Signup request:', body);

    const { name, email, password, role } = body;

 
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields required' }, 
        { status: 400 }
      );
    }

   
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' }, 
        { status: 400 }
      );
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user', 
    });

    console.log('✅ User created:', { id: user._id, role: user.role });

    const token = signToken({
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      message: 'Account created successfully!',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirectTo: user.role === 'admin' ? '/admin' : '/',
    });

    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, 
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Server error: ' + error.message }, 
      { status: 500 }
    );
  }
}