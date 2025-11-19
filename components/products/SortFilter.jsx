// components/products/SortFilter.jsx
"use client";
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating-desc' },
];

const SortFilter = ({ currentSort, searchParams }) => {
  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    window.location.href = `/products?${params.toString()}`;
  };

  return (
    <div className="relative">
      <select
        value={currentSort}
        onChange={handleChange}
        className="appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-3 text-sm font-medium text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer hover:border-primary"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
      />
    </div>
  );
};

export default SortFilter;