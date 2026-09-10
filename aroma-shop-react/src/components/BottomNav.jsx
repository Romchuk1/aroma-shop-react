import React from 'react';

export default function BottomNav({ activeTab, setActiveTab, cartCount = 0 }) {
  const navItems = [
    { id: 'catalog', label: 'Каталог', icon: '🛍' },
    { id: 'finder', label: 'Підбір', icon: '🎯' },
    { id: 'cart', label: 'Кошик', icon: '🛒', badge: cartCount },
    { id: 'orders', label: 'Замовлення', icon: '📦' },
    { id: 'profile', label: 'Профіль', icon: '👤' },
    { id: 'support', label: 'Підтримка', icon: '💬' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-zinc-800 py-2 px-1 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative flex flex-col items-center justify-center flex-1 py-1 text-[10px] transition-all ${
              isActive ? 'text-amber-400 font-bold scale-105' : 'text-zinc-500'
            }`}
          >
            <span className="text-lg mb-0.5">{item.icon}</span>
            <span className="truncate max-w-[55px]">{item.label}</span>
            
            {item.badge > 0 && (
              <span className="absolute -top-1 right-2 bg-amber-500 text-black font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}