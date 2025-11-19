// app/admin/products/add/page.jsx
"use client";
import ProductForm from '@/components/admin/products/ProductForm';
import Link from 'next/link';

export default function AddProductPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <Link href="/admin/products" className="text-red-600 hover:underline">
          ← Back to Products
        </Link>
      </div>
      <ProductForm />
    </div>
  );
}