// components/products/CategoryCard.jsx
import Link from "next/link";
import Image from "next/image";

const CategoryCard = ({ category }) => {
  return (
    <Link
      href={`/products?category=${category.slug || category.name.toLowerCase()}`}
      className="block group"
    >
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-pink-500/10 rounded-full blur-xl group-hover:blur-2xl transition"></div>
          <Image
            src={category.image || "/images/categories/default.png"}
            alt={category.name}
            fill
            className="object-contain rounded-full p-3 bg-white shadow-inner"
          />
        </div>
        <h3 className="font-bold text-gray-800 group-hover:text-primary transition text-sm md:text-base">
          {category.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {category.count || 0} Products
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;