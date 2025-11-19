// app/admin/products/page.jsx
import ProductsTable from '@/components/admin/products/ProductsTable';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Add Product
        </Link>
      </div>

      <ProductsTable />
      <Toaster position="top-right" /> {/* YE ZAROORI */}
    </div>
  );
}