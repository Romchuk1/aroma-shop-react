import React from 'react';

export default function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center text-zinc-500 space-y-3 pt-20">
        <span className="text-4xl block">🛒</span>
        <h2 className="text-lg font-bold text-white">Твій кошик порожній</h2>
        <p className="text-xs">Обери свій улюблений аромат у каталозі та додай його сюди</p>
      </div>
    );
  }

  return (
    <div className="p-4 pb-28 text-white space-y-4">
      <h1 className="text-2xl font-black tracking-wide mb-2">КОШИК</h1>

      {/* Список товарів */}
      <div className="space-y-3">
        {cartItems.map((item) => (
          <div 
            key={item.cartItemId} 
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 flex gap-3 items-center justify-between shadow-lg"
          >
            {/* Фото товару */}
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-16 h-16 object-cover rounded-xl bg-zinc-800 shrink-0" 
            />

            {/* Деталі товару */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                {item.brand}
              </span>
              <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
              <p className="text-xs text-zinc-400">
                {item.purchaseType} · {item.volume}
              </p>
              <p className="text-xs font-black text-amber-400 mt-1">
                {item.price * item.quantity} ₴
              </p>
            </div>

            {/* Кнопки кількості та видалення */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <button 
                onClick={() => onRemoveItem(item.cartItemId)}
                className="text-zinc-500 hover:text-red-400 text-xs p-1 transition"
                title="Видалити"
              >
                ✕
              </button>

              <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-lg p-0.5">
                <button 
                  onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                  className="w-6 h-6 flex items-center justify-center text-xs font-bold text-zinc-300 hover:text-white"
                >
                  −
                </button>
                <span className="w-6 text-center text-xs font-bold text-amber-400">
                  {item.quantity}
                </span>
                <button 
                  onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center text-xs font-bold text-zinc-300 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Підсумок та Кнопка Оформити */}
      <div className="fixed bottom-16 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-zinc-800 p-4 space-y-3 z-40">
        <div className="flex justify-between items-center">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Разом:</span>
          <span className="text-xl font-black text-amber-400">{totalPrice} ₴</span>
        </div>

        <button 
          onClick={onProceedToCheckout}
          className="w-full bg-amber-400 hover:bg-amber-500 text-black font-extrabold py-3 rounded-xl text-xs transition active:scale-95 shadow-lg shadow-amber-400/10"
        >
          Оформити замовлення
        </button>
      </div>
    </div>
  );
}