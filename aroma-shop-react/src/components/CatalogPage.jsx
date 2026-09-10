import React, { useState } from 'react';
import { PRODUCTS, BRANDS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function CatalogPage({ onSelectProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('Усі');
  const [selectedBrand, setSelectedBrand] = useState('Усі');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchCategory = selectedCategory === 'Усі' || product.category === selectedCategory;
    const matchBrand = selectedBrand === 'Усі' || product.brand === selectedBrand;
    return matchCategory && matchBrand;
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-black text-white tracking-wide">КАТАЛОГ</h1>

      {/* Категорії */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-amber-400 text-black'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Бренди */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {BRANDS.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              selectedBrand === brand
                ? 'bg-zinc-200 text-black font-bold'
                : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Сітка товарів */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onSelectProduct={onSelectProduct} 
          />
        ))}
      </div>
    </div>
  );
}