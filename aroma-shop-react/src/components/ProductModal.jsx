import React, { useState } from 'react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [purchaseType, setPurchaseType] = useState('decant'); // 'decant' або 'full'
  const [selectedDecant, setSelectedDecant] = useState(product.decants[0]);

  const handleAdd = () => {
    const isDecant = purchaseType === 'decant';
    
    const cartItem = {
      cartItemId: `${product.id}-${isDecant ? selectedDecant.ml : 'full'}`,
      id: product.id,
      brand: product.brand,
      title: product.title,
      image: product.image,
      purchaseType: isDecant ? 'Відпив' : 'Цілий флакон',
      volume: isDecant ? selectedDecant.ml : product.fullBottleVolume,
      price: isDecant ? selectedDecant.price : product.fullBottlePrice,
      quantity: 1
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto text-white">
        
        {/* Шапка модалки */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase">{product.brand}</span>
            <h2 className="text-lg font-black">{product.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white bg-zinc-800 rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Зображення */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-800">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Перемикач типу покупки */}
        <div className="grid grid-cols-2 gap-2 bg-zinc-800/60 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setPurchaseType('decant')}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              purchaseType === 'decant' ? 'bg-amber-400 text-black' : 'text-zinc-400'
            }`}
          >
            Розпив (мл)
          </button>
          <button
            onClick={() => setPurchaseType('full')}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              purchaseType === 'full' ? 'bg-amber-400 text-black' : 'text-zinc-400'
            }`}
          >
            Флакон ({product.fullBottleVolume})
          </button>
        </div>

        {/* Варіанти об'єму для розпиву */}
        {purchaseType === 'decant' ? (
          <div className="space-y-2">
            <label className="text-xs text-zinc-400 block">Оберіть об'єм:</label>
            <div className="grid grid-cols-3 gap-2">
              {product.decants.map((decant) => (
                <button
                  key={decant.ml}
                  onClick={() => setSelectedDecant(decant)}
                  className={`p-2 rounded-xl text-center border transition ${
                    selectedDecant.ml === decant.ml
                      ? 'border-amber-400 bg-amber-400/10 text-white'
                      : 'border-zinc-800 bg-zinc-800/40 text-zinc-400'
                  }`}
                >
                  <span className="text-xs font-bold block">{decant.ml}</span>
                  <span className="text-[10px] text-amber-400">{decant.price} ₴</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-zinc-800/40 p-3 rounded-xl border border-zinc-800 space-y-1">
            <span className="text-xs text-zinc-400 block">Заводський флакон у коробці:</span>
            <p className="text-sm font-bold text-amber-400">{product.fullBottleVolume} — {product.fullBottlePrice} ₴</p>
          </div>
        )}

        {/* Кнопка додавання */}
        <button
          onClick={handleAdd}
          className="w-full bg-amber-400 hover:bg-amber-500 text-black font-extrabold py-3.5 rounded-xl text-xs transition shadow-lg shadow-amber-400/10"
        >
          Додати в кошик • {purchaseType === 'decant' ? selectedDecant.price : product.fullBottlePrice} ₴
        </button>

      </div>
    </div>
  );
}