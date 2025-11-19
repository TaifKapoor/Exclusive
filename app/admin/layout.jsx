// app/admin/layout.jsx
import { redirect } from 'next/navigation';
import { getUserFromToken } from '@/lib/auth';
import AdminLayoutClient from '@/components/admin/layout/AdminLayoutClient';

export default async function AdminLayout({ children }) {
  console.log('🔍 [AdminLayout] Checking authentication...');
  
  const user = await getUserFromToken();
  console.log('👤 [AdminLayout] User:', user);

  if (!user) {
    console.log(' [AdminLayout] No user, redirecting to login');
    redirect('/login');
  }

  if (user.role !== 'admin') {
    console.log(' [AdminLayout] Not admin, redirecting home');
    redirect('/');
  }

  console.log('✅ [AdminLayout] Admin access granted:', user.name);

  
  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>;
}