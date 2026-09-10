import React, { useState, useEffect } from 'react';

export default function Checkout({ cartItems, onConfirmOrder, onBack }) {
  const [step, setStep] = useState('form');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    delivery: 'Нова пошта',
    city: '',
    warehouse: ''
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleNext = (e) => {
    e.preventDefault();
    setError('');

    // Блок 7: Перевірка імені (мінімум 2 символи)
    if (formData.name.trim().length < 2) {
      setError('Будь ласка, введіть коректне ім’я (мінімум 2 символи)');
      return;
    }

    // Блок 7: Перевірка телефону (формат +380XXXXXXXXX або 0XXXXXXXXX)
    const phoneRegex = /^(\+?38)?0\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      setError('Введіть коректний номер телефону (наприклад, +380971234567)');
      return;
    }

    if (!formData.city.trim()) {
      setError('Вкажіть місто доставки');
      return;
    }

    localStorage.setItem('user_profile', JSON.stringify(formData));
    setStep('review');
  };

  return (
    <div className="p-4 pb-28 text-white space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="text-zinc-400 text-sm">← Назад</button>
        <h1 className="text-xl font-black">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h1>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl">
          {error}
        </div>
      )}

      {step === 'form' ? (
        <form onSubmit={handleNext} className="space-y-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Ім'я *</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Роман"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Номер телефону *</label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+380971234567"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Спосіб доставки</label>
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
            <label className="text-xs text-zinc-400 block mb-1">Місто *</label>
            <input 
              type="text" 
              required
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              placeholder="Луцьк"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          {formData.delivery !== 'Самовивіз' && (
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Відділення / Адреса *</label>
              <input 
                type="text" 
                required
                value={formData.warehouse}
                onChange={(e) => setFormData({...formData, warehouse: e.target.value})}
                placeholder="Відділення №1"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-2.5 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-black font-extrabold py-3 rounded-xl text-xs transition mt-4"
          >
            Далі: Перевірка замовлення
          </button>
        </form>
      ) : (
        <div className="space-y-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
          <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Перевірте замовлення</h2>

          <div className="space-y-2 border-b border-zinc-800 pb-3">
            <span className="text-xs text-zinc-400 block">Товари:</span>
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex justify-between text-xs">
                <span>{item.brand} {item.title} ({item.purchaseType} · {item.volume}) × {item.quantity}</span>
                <span className="font-bold">{item.price * item.quantity} ₴</span>
              </div>
            ))}
          </div>

          <div className="space-y-1 text-xs border-b border-zinc-800 pb-3">
            <span className="text-zinc-400 block mb-1">Доставка:</span>
            <p><span className="text-zinc-500">Отримувач:</span> {formData.name}, {formData.phone}</p>
            <p><span className="text-zinc-500">Адреса:</span> {formData.delivery}, м. {formData.city}, {formData.warehouse}</p>
          </div>

          <div className="flex justify-between items-center text-sm font-bold pt-1">
            <span>Сума:</span>
            <span className="text-amber-400 text-base">{totalPrice} ₴</span>
          </div>

          <div className="space-y-2 pt-3">
            <button 
              onClick={() => onConfirmOrder(formData)}
              className="w-full bg-amber-400 hover:bg-amber-500 text-black font-extrabold py-3 rounded-xl text-xs transition shadow-lg shadow-amber-400/10"
            >
              Підтвердити замовлення
            </button>
            
            <button 
              onClick={() => setStep('form')}
              className="w-full bg-zinc-800 text-zinc-300 font-semibold py-2.5 rounded-xl text-xs transition"
            >
              Змінити дані
            </button>
          </div>
        </div>
      )}
    </div>
  );
}