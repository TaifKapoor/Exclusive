// app/admin/products/edit/[id]/page.jsx
"use client";
import ProductForm from '@/components/admin/products/ProductForm';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const { id } = useParams();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <Link href="/admin/products" className="text-red-600 hover:underline">
          ← Back
        </Link>
      </div>
      <ProductForm productId={id} />
    </div>
  );
}