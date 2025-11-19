// components/orders/OrderCard.jsx
import { Package, Clock, Truck, CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  processing: { icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
  shipped: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
  delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
};

const OrderCard = ({ order }) => {
  const StatusIcon = statusConfig[order.status]?.icon || Package;
  const statusColor = statusConfig[order.status]?.color || 'text-gray-600';
  const statusBg = statusConfig[order.status]?.bg || 'bg-gray-50';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">
              Order #{order.orderId || order.id}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusBg} ${statusColor}`}>
              <StatusIcon size={14} />
              {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Placed on {new Date(order.createdAt || order.date).toLocaleDateString()}
          </p>
        </div>
        <Link
          href={`/orders/${order.orderId || order.id}`}
          className="text-sm text-red-600 hover:underline flex items-center gap-1"
        >
          View Details
          <ChevronRight size={16} />
        </Link>
      </div>


      {order.items && order.items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {order.items.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {item.image && (
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-600">
                  {item.quantity || item.qty} × ${(item.price || 0).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="flex items-center justify-center text-sm text-gray-500">
              +{order.items.length - 3} more
            </div>
          )}
        </div>
      )}

     
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Total Amount</p>
         
          <p className="text-xl font-bold text-red-600">
            ${(order.totalAmount || order.total || 0).toFixed(2)}
          </p>
        </div>
        <Link
          href={`/orders/${order.orderId || order.id}`}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition"
        >
          Track Order
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;