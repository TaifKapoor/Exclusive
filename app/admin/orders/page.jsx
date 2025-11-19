// app/admin/orders/page.jsx
import OrdersTable from '@/components/admin/orders/OrdersTable';
import { Toaster } from 'react-hot-toast';

export default function AdminOrdersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>
      <OrdersTable />
      <Toaster position="top-right" />
    </div>
  );
}