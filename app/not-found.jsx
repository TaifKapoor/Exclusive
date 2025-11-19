// app/not-found.jsx
import CountdownTimer from '@/components/common/CountdownTimer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-black text-red-600 mb-4">404</h1>
        <p className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        
        {/* SAFE: Client component, no SSR crash */}
        <div className="flex justify-center">
          <CountdownTimer targetDate="2025-12-31T23:59:59" />
        </div>

        <a href="/" className="mt-8 inline-block bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition">
          Go Home
        </a>
      </div>
    </div>
  );
}