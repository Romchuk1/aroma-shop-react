import React from 'react';

export default function Orders({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <div className="p-6 text-center text-zinc-500 space-y-3 pt-20">
        <span className="text-4xl block">📦</span>
        <h2 className="text-lg font-bold text-white">У вас поки немає замовлень</h2>
        <p className="text-xs">Після оформлення покупки ваше замовлення з'явиться тут</p>
      </div>
    );
  }

  return (
    <div className="p-4 pb-28 text-white space-y-4">
      <h1 className="text-2xl font-black tracking-wide mb-2">МОЇ ЗАМОВЛЕННЯ</h1>

      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <div>
                <span className="text-xs font-bold text-white block">№ {order.id}</span>
                <span className="text-[10px] text-zinc-500">{order.date}</span>
              </div>
              <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                {order.status || 'Прийнято'}
              </span>
            </div>

            <div className="space-y-1">
              {order.items.map((item) => (
                <div key={item.cartItemId} className="flex justify-between text-xs text-zinc-300">
                  <span>{item.brand} {item.title} ({item.volume}) × {item.quantity}</span>
                  <span className="font-semibold">{item.price * item.quantity} ₴</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-zinc-800 pt-2 text-xs">
              <span className="text-zinc-400">Всього:</span>
              <span className="text-sm font-black text-amber-400">{order.totalPrice} ₴</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}