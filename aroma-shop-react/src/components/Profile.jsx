import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    delivery: 'Нова пошта',
    city: '',
    warehouse: ''
  });

  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('user_profile', JSON.stringify(formData));
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="p-4 pb-28 text-white space-y-4">
      <h1 className="text-2xl font-black tracking-wide mb-2">МІЙ ПРОФІЛЬ</h1>

      <form onSubmit={handleSave} className="space-y-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
        <div>
          <label className="text-xs text-zinc-400 block mb-1">Ім'я</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Введіть ім'я"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400 block mb-1">Номер телефону</label>
          <input 
            type="tel" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="+380..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400 block mb-1">Спосіб доставки за замовчуванням</label>
          <select 
            value={formData.delivery}
            onChange={(e) => setFormData({...formData, delivery: e.target.value})}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-400 text-white"
          >
            <option>Нова пошта</option>
            <option>Укрпошта</option>
            <option>Самовивіз</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-zinc-400 block mb-1">Місто</label>
          <input 
            type="text" 
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            placeholder="Введіть місто"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400 block mb-1">Відділення / Адреса</label>
          <input 
            type="text" 
            value={formData.warehouse}
            onChange={(e) => setFormData({...formData, warehouse: e.target.value})}
            placeholder="№ відділення"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-amber-400 hover:bg-amber-500 text-black font-extrabold py-3 rounded-xl text-xs transition mt-2"
        >
          Зберегти дані
        </button>

        {savedMessage && (
          <p className="text-xs text-emerald-400 text-center font-bold">✓ Дані успішно збережено!</p>
        )}
      </form>
    </div>
  );
}