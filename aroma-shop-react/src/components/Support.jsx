import React from 'react';

export default function Support() {
  return (
    <div className="p-4 pb-28 text-white space-y-6 pt-8">
      <div className="text-center space-y-2">
        <span className="text-5xl block mb-2">💬</span>
        <h1 className="text-2xl font-black tracking-wide">ПІДТРИМКА</h1>
        <p className="text-xs text-zinc-400 max-w-xs mx-auto">
          Маєте запитання щодо аромату, вибору об'єму чи доставки? Наш менеджер залюбки допоможе!
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Графік роботи</h3>
        <p className="text-xs text-zinc-300">Щодня з 09:00 до 21:00</p>
      </div>

      <a 
        href="https://t.me/your_support_username" 
        target="_blank" 
        rel="noreferrer"
        className="w-full bg-amber-400 hover:bg-amber-500 text-black font-extrabold py-3.5 rounded-xl text-xs transition flex justify-center items-center gap-2 shadow-lg shadow-amber-400/10 block text-center"
      >
        <span>Написати менеджеру в Telegram</span>
      </a>
    </div>
  );
}