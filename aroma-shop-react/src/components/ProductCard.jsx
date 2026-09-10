import React from 'react';

export default function ProductCard({ product, onSelectProduct }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 flex flex-col justify-between shadow-lg">
      <div className="relative w-full h-40 mb-2 rounded-xl overflow-hidden bg-zinc-800">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Позначки Хіт / Новинка */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isHit && (
            <span className="bg-amber-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
              ХІТ
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
              NEW
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
            {product.brand}
          </span>
          <h3 className="text-white font-bold text-sm leading-tight mb-1 truncate">
            {product.title}
          </h3>
          <span className="text-xs text-zinc-400 block mb-3">
            від {product.priceFrom} ₴
          </span>
        </div>

        <button 
          onClick={() => onSelectProduct(product)}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-amber-400/20 font-semibold py-2 rounded-xl text-xs transition active:scale-95"
        >
          Переглянути товар
        </button>
      </div>
    </div>
  );
}