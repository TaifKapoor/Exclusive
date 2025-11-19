"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Product name required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  originalPrice: z.coerce.number().optional(),
  image: z.string().url('Invalid URL').or(z.literal('')),
  category: z.string().min(1, 'Category required'),
  stock: z.coerce.number().min(0, 'Stock must be positive').optional(),
  description: z.string().optional(),
});

export default function ProductForm({ productId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: '',
      name: '',
      price: '',
      originalPrice: '',
      image: '',
      category: '',
      stock: '',
      description: '',
    },
  });

  const imageValue = watch('image');

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then(r => r.json())
        .then(data => {
          Object.keys(data).forEach(key => setValue(key, data[key] || ''));
          setImagePreview(data.image || '');
        })
        .catch(() => {
          toast.error('Product not found');
          router.push('/admin/products');
        });
    }
  }, [productId, setValue, router]);

  useEffect(() => {
    setImagePreview(imageValue || '');
  }, [imageValue]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select an image');
      return;
    }

    setUploading(true);

    try {
      
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      console.log('Compressed:', compressedFile.size / 1024 / 1024, 'MB');

      const formData = new FormData();
      formData.append('file', compressedFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setValue('image', data.url);
        setImagePreview(data.url);
        toast.success('Image uploaded!');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const method = productId ? 'PUT' : 'POST';
      const url = productId ? `/api/products/${productId}` : '/api/products';

      const payload = {
        ...data,
        images: data.image ? [data.image] : [],
      };

      delete payload.image;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(productId ? 'Product updated!' : 'Product added!');
        router.push('/admin/products');
      } else {
        const err = await res.json();
        toast.error(err.error || 'Save failed');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {productId ? 'Edit Product' : 'Add New Product'}
        </h2>

        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">Product Image</label>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
                {uploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                    <p className="mt-2 text-sm text-gray-600">Uploading...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="text-gray-400" size={32} />
                    <p className="mt-2 text-sm text-gray-600">Click to upload</p>
                  </div>
                )}
              </div>
            </div>

            {imagePreview && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                <div className="relative rounded-xl overflow-hidden bg-gray-50 h-48 border">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setValue('image', '')}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
        </div>

        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            
            <input {...register('name')} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-900" placeholder="iPhone 15" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
            
            <input {...register('price')} type="number" step="0.01" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-900" placeholder="999.99" />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Original Price ($)</label>
            
            <input {...register('originalPrice')} type="number" step="0.01" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-900" placeholder="1299.99" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            
            <input {...register('category')} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-900" placeholder="Electronics" />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
         
            <input {...register('stock')} type="number" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-900" placeholder="50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            
            <textarea {...register('description')} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none text-gray-900" placeholder="Write a detailed description..." />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : null}
            {loading ? 'Saving...' : productId ? 'Update Product' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="px-6 py-3.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}