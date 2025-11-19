// components/admin/dashboard/StatsCard.jsx
export default function StatsCard({ title, value, change }) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow hover:shadow-md transition-shadow">
      <p className="text-xs lg:text-sm text-gray-600">{title}</p>
      <p className="text-xl lg:text-2xl font-bold mt-1 lg:mt-2">{value}</p>
      <p className={`text-xs lg:text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change} <span className="hidden sm:inline">from last month</span>
      </p>
    </div>
  );
}