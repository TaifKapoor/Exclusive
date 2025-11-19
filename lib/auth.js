// lib/auth.js
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { connectDB } from './db';


export const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};


export async function getUserFromToken() {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      console.log(' No token found');
      return null;
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(' Token decoded:', decoded);

  
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      console.log(' User not found in DB');
      return null;
    }

    console.log(' User found:', { id: user._id, role: user.role });

 
    return {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

  } catch (error) {
    console.error(' Token verification failed:', error.message);
    return null;
  }
}








// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';
// import { connectDB } from './db';


// // signToken EXPORTED
// export const signToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
// };

// // getUserFromToken EXPORTED
// export async function getUserFromToken() {
//   try {
//     await connectDB();
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;
//     if (!token) return null;
//     return jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     console.error('Token verification failed:', error.message);
//     return null;
//   }
// }