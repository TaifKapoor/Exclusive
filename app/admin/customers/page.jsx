// app/admin/customers/page.jsx
import CustomersTable from '@/components/admin/customers/CustomersTable';

export default function CustomersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      <CustomersTable />
    </div>
  );
}