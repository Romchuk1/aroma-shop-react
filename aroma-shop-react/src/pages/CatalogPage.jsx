import React, { useState } from 'react';

// Початковий список товарів
const initialProducts = [
  {
    id: '1',
    brand: 'Tom Ford',
    title: 'Lost Cherry',
    gender: 'Унісекс',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80',
    fullBottlePrice: 12500,
    fullBottleVolume: '100 мл',
    decants: [
      { ml: '1 ml', price: 180 },
      { ml: '2 ml', price: 340 },
      { ml: '3 ml', price: 490 },
      { ml: '5 ml', price: 780 },
      { ml: '10 ml', price: 1450 },
      { ml: '15 ml', price: 2100 },
      { ml: '20 ml', price: 2750 }
    ]
  },
  {
    id: '2',
    brand: 'Maison Francis Kurkdjian',
    title: 'Baccarat Rouge 540',
    gender: 'Унісекс',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500&q=80',
    fullBottlePrice: 14200,
    fullBottleVolume: '70 мл',
    decants: [
      { ml: '1 ml', price: 210 },
      { ml: '2 ml', price: 400 },
      { ml: '3 ml', price: 580 },
      { ml: '5 ml', price: 920 },
      { ml: '10 ml', price: 1750 },
      { ml: '15 ml', price: 2550 },
      { ml: '20 ml', price: 3300 }
    ]
  },
  {
    id: '3',
    brand: 'Creed',
    title: 'Aventus',
    gender: 'Чоловічий',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=80',
    fullBottlePrice: 13800,
    fullBottleVolume: '100 мл',
    decants: [
      { ml: '1 ml', price: 195 },
      { ml: '2 ml', price: 370 },
      { ml: '3 ml', price: 540 },
      { ml: '5 ml', price: 860 },
      { ml: '10 ml', price: 1620 },
      { ml: '15 ml', price: 2380 },
      { ml: '20 ml', price: 3100 }
    ]
  },
  {
    id: '4',
    brand: 'Byredo',
    title: 'Gypsy Water',
    gender: 'Унісекс',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&q=80',
    fullBottlePrice: 9800,
    fullBottleVolume: '100 мл',
    decants: [
      { ml: '1 ml', price: 140 },
      { ml: '2 ml', price: 260 },
      { ml: '3 ml', price: 380 },
      { ml: '5 ml', price: 610 },
      { ml: '10 ml', price: 1150 },
      { ml: '15 ml', price: 1680 },
      { ml: '20 ml', price: 2200 }
    ]
  }
];

export default function CatalogPage({ onSelectProduct }) {
  const [search, setSearch] = useState('');
  const [selectedGender, setSelectedGender] = useState('Усі');

  // Фільтрація товарів
  const filteredProducts = initialProducts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesGender = selectedGender === 'Усі' || p.gender === selectedGender;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="space-y-4">
      {/* Шапка */}
      <div className="flex justify-between items-center pt-2">
        <div>
          <h1 className="text-xl font-black tracking-wider text-white">AROMA SHOP</h1>
          <p className="text-[10px] text-zinc-400">Елітна парфумерія & розпив</p>
        </div>
      </div>

      {/* Пошук */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Пошук брендів чи ароматів..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400/50 transition"
        />
      </div>

      {/* Категорії (Фільтри) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {['Усі', 'Жіночий', 'Чоловічий', 'Унісекс'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedGender(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              selectedGender === cat 
                ? 'bg-amber-400 text-black font-bold' 
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Сітка товарів */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            onClick={() => onSelectProduct(product)}
            className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-2.5 flex flex-col justify-between cursor-pointer hover:border-zinc-700 transition"
          >
            <div>
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-2 bg-zinc-800">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-md text-amber-400 text-[9px] px-2 py-0.5 rounded-md font-bold">
                  {product.gender}
                </span>
              </div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                {product.brand}
              </span>
              <h3 className="text-xs font-semibold text-white line-clamp-1">{product.title}</h3>
            </div>

            <div className="mt-3 pt-2 border-t border-zinc-800/60 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-zinc-500 block">від (1 мл)</span>
                <span className="text-xs font-bold text-white">{product.decants[0].price} ₴</span>
              </div>
              <button className="bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-xs px-2.5 py-1.5 rounded-lg transition">
                Обрати
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}