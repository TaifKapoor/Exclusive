// app/profile/page.jsx
import { redirect } from 'next/navigation';
import { getUserFromToken } from '@/lib/auth';


export default async function ProfilePage() {
  const user = await getUserFromToken();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-12 text-center">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            <p className="text-purple-100">{user.email}</p>
          </div>

          {/* Body */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">
                    {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="text-sm font-mono text-gray-600">{user.userId}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              {user.role === 'admin' && (
                <a
                  href="/admin"
                  className="block w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center font-semibold rounded-lg hover:shadow-lg transition"
                >
                  Go to Admin Dashboard
                </a>
              )}
              
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}