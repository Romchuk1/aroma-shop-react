import React, { useState, useEffect } from 'react';
import CatalogPage from './pages/CatalogPage.jsx';
import ProductModal from './components/ProductModal.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Profile from './components/Profile.jsx';
import Orders from './components/Orders.jsx';
import Support from './components/Support.jsx';
import BottomNav from './components/BottomNav.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Завантажуємо кошик та історію замовлень із пам'яті
  useEffect(() => {
    const savedCart = localStorage.getItem('cart_items');
    if (savedCart) setCartItems(JSON.parse(savedCart));

    const savedOrders = localStorage.getItem('user_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Збереження кошика при змінах
  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart_items', JSON.stringify(newCart));
  };

  // Додавання товару в кошик
  const handleAddToCart = (newItem) => {
    const existingIndex = cartItems.findIndex(i => i.cartItemId === newItem.cartItemId);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      updateCart(updated);
    } else {
      updateCart([...cartItems, newItem]);
    }
  };

  // Зміна кількості в кошику
  const handleUpdateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    const updated = cartItems.map(item => 
      item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
    );
    updateCart(updated);
  };

  // Видалення з кошика
  const handleRemoveItem = (cartItemId) => {
    const updated = cartItems.filter(item => item.cartItemId !== cartItemId);
    updateCart(updated);
  };

  // Підтвердження замовлення
  const handleConfirmOrder = (formData) => {
    const newOrder = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      date: new Date().toLocaleDateString('uk-UA'),
      status: 'Прийнято',
      items: [...cartItems],
      totalPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      customer: formData
    };

    // Зберігаємо замовлення в історію
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('user_orders', JSON.stringify(updatedOrders));

    // Відправляємо дані в Telegram WebApp (якщо запущено всередині Telegram)
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify(newOrder));
    }

    // Очищаємо кошик
    updateCart([]);
    setActiveTab('orders');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 pb-24 max-w-md mx-auto">
      
      {/* Перемикання Екранів */}
      {activeTab === 'catalog' && (
        <CatalogPage onSelectProduct={(prod) => setSelectedProduct(prod)} />
      )}

      {activeTab === 'cart' && (
        <Cart 
          cartItems={cartItems} 
          onUpdateQuantity={handleUpdateQuantity} 
          onRemoveItem={handleRemoveItem} 
          onProceedToCheckout={() => setActiveTab('checkout')}
        />
      )}

      {activeTab === 'checkout' && (
        <Checkout 
          cartItems={cartItems} 
          onConfirmOrder={handleConfirmOrder} 
          onBack={() => setActiveTab('cart')}
        />
      )}

      {activeTab === 'orders' && <Orders orders={orders} />}

      {activeTab === 'profile' && <Profile />}

      {activeTab === 'support' && <Support />}

      {/* Модальне вікно вибору об'єму товару */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCart}
      />

      {/* Нижня панель навігації */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
      />
    </div>
  );
}