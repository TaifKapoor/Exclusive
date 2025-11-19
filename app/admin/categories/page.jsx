// app/admin/categories/page.jsx
"use client";
import { useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState(['Electronics', 'Fashion', 'Home', 'Sports']);
  const [newCat, setNewCat] = useState('');

  const addCategory = () => {
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      setNewCat('');
    }
  };

  const deleteCategory = (cat) => {
    setCategories(categories.filter(c => c !== cat));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex gap-3 mb-6">
          <input
            placeholder="New Category"
            value={newCat}
            onChange={e => setNewCat(e.target.value)}
            className="input flex-1"
          />
          <button onClick={addCategory} className="btn-primary">Add</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map(cat => (
            <div key={cat} className="flex justify-between items-center p-3 border rounded-lg">
              <span>{cat}</span>
              <button onClick={() => deleteCategory(cat)} className="text-red-600 hover:text-red-800">
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}