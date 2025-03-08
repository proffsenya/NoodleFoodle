import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatherIcon from 'feather-icons-react';

// Компонент для отображения одного товара в корзине
const CartItem = ({ item, handleQuantityChange, removeItem }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-200">
    <div className="flex items-center">
      <img src={item.image} alt={item.name} className="object-cover w-16 h-16 rounded-lg" />
      <div className="ml-4">
        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
        <p className="text-gray-700">{item.price} ₽ x {item.quantity}</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        <FeatherIcon icon="minus" className="w-[16px] h-[16px]" />
      </button>
      <span className="text-xl">{item.quantity}</span>
      <button
        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        <FeatherIcon icon="plus" className="w-[16px] h-[16px]" />
      </button>
    </div>
    <button
      onClick={() => removeItem(item.id)}
      className="text-red-600 hover:text-red-700"
    >
      <FeatherIcon icon="trash-2" className="w-[18px] h-[18px]" />
    </button>
  </div>
);

// Компонент для ввода и применения промокода
const PromoCodeSection = ({ discountCode, setDiscountCode, applyDiscount }) => (
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700">Промокод</label>
    <div className="flex mt-2 space-x-4">
      <input
        type="text"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        placeholder="Введите промокод"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={applyDiscount}
        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Применить
      </button>
    </div>
  </div>
);

// Компонент для выбора чаевых
const TipSection = ({ selectedTip, handleTipSelection }) => (
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700">Добавить чаевые</label>
    <div className="flex mt-2 space-x-4">
      {[10, 15, 20].map(tip => (
        <button
          key={tip}
          onClick={() => handleTipSelection(tip)}
          className={`px-4 py-2 rounded-lg ${
            selectedTip === tip
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {tip}%
        </button>
      ))}
      <button
        onClick={() => handleTipSelection(null)}
        className={`px-4 py-2 rounded-lg ${
          selectedTip === null
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Нет
      </button>
    </div>
  </div>
);

// Компонент для выбора типа упаковки
const PackagingSection = ({ packagingType, setPackagingType }) => (
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700">Тип упаковки</label>
    <div className="flex mt-2 space-x-4">
      <button
        onClick={() => setPackagingType("standard")}
        className={`px-4 py-2 rounded-lg ${
          packagingType === "standard"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Стандартная
      </button>
      <button
        onClick={() => setPackagingType("eco")}
        className={`px-4 py-2 rounded-lg ${
          packagingType === "eco"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Эко-упаковка
      </button>
    </div>
  </div>
);

// Компонент для выбора времени доставки
const DeliveryTimeSection = ({ deliveryTime, setDeliveryTime }) => (
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700">Время доставки</label>
    <select
      value={deliveryTime}
      onChange={(e) => setDeliveryTime(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
    >
      <option value="">Выберите время</option>
      <option value="12:00">12:00</option>
      <option value="13:00">13:00</option>
      <option value="14:00">14:00</option>
      <option value="15:00">15:00</option>
    </select>
  </div>
);

// Компонент для ввода данных для доставки
const DeliveryInfoForm = () => (
  <div>
    <h2 className="mb-6 text-2xl font-bold text-gray-900">Данные для доставки</h2>
    <form>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="name">
          Имя
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          id="name"
          type="text"
          placeholder="Введите ваше имя"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="address">
          Адрес
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          id="address"
          type="text"
          placeholder="Введите ваш адрес"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="phone">
          Телефон
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          id="phone"
          type="tel"
          placeholder="Введите ваш телефон"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          id="email"
          type="email"
          placeholder="Введите ваш email"
          required
        />
      </div>
    </form>
  </div>
);

// Компонент для отображения итоговой суммы и кнопки подтверждения заказа
const OrderSummary = ({ discount, tips, finalPrice }) => (
  <div className="mt-20">
    <h2 className="mb-6 text-2xl font-bold text-gray-900">Итоговая сумма</h2>
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-gray-700">Скидка</span>
        <span className="text-gray-900">-{discount} ₽</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-700">Чаевые</span>
        <span className="text-gray-900">{tips} ₽</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-700">Итого</span>
        <span className="font-bold text-gray-900">{finalPrice} ₽</span>
      </div>
    </div>
    <button
      className="w-full px-6 py-3 mt-6 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700"
    >
      Подтвердить заказ
    </button>
  </div>
);

// Основной компонент Checkout
export default function Checkout() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Сырный рамен",
      price: 150,
      quantity: 2,
      image: "/img/cheese.jpg",
    },
    {
      id: 2,
      name: "Лапша Рамен",
      price: 180,
      quantity: 1,
      image: "/img/classic.jpg",
    },
    {
      id: 3,
      name: "Вьетнамский рамен",
      price: 160,
      quantity: 3,
      image: "/img/vietnamskiy.jpeg",
    },
    {
      id: 9,
      name: "Том ям королевский с морепродуктами",
      price: 220,
      quantity: 1,
      image: "/img/royal.jpg",
    },
  ]);

  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedTip, setSelectedTip] = useState(null);
  const [packagingType, setPackagingType] = useState("standard");
  const [deliveryTime, setDeliveryTime] = useState("");

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tips = selectedTip ? (totalPrice * selectedTip) / 100 : 0;
  const finalPrice = totalPrice - discount + tips;

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };

  const applyDiscount = () => {
    if (discountCode === "WELCOME10") {
      setDiscount(totalPrice * 0.1);
      alert("Скидка 10% применена!");
    } else if (discountCode === "SUMMER20") {
      setDiscount(totalPrice * 0.2);
      alert("Скидка 20% применена!");
    } else {
      alert("Неверный код скидки.");
    }
  };

  const handleTipSelection = (tip) => {
    setSelectedTip(tip);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center flex-grow p-12 space-y-12" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
        <h1 className="mt-16 mb-8 text-4xl font-bold text-gray-900">Оформление заказа</h1>
        
        {/* Основной контейнер с двумя колонками */}
        <div className="flex flex-col w-full max-w-6xl gap-8 md:flex-row">
          {/* Левая колонка: Корзина */}
          <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-1/2">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Ваш заказ</h2>
            
            {/* Список товаров */}
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                handleQuantityChange={handleQuantityChange}
                removeItem={removeItem}
              />
            ))}

            {/* Промокод */}
            <PromoCodeSection
              discountCode={discountCode}
              setDiscountCode={setDiscountCode}
              applyDiscount={applyDiscount}
            />

            {/* Чаевые */}
            <TipSection
              selectedTip={selectedTip}
              handleTipSelection={handleTipSelection}
            />

            {/* Тип упаковки */}
            <PackagingSection
              packagingType={packagingType}
              setPackagingType={setPackagingType}
            />

            {/* Время доставки */}
            <DeliveryTimeSection
              deliveryTime={deliveryTime}
              setDeliveryTime={setDeliveryTime}
            />
          </div>

          {/* Правая колонка: Данные для доставки и итоговая сумма */}
          <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-1/2">
            <DeliveryInfoForm />
            <OrderSummary
              discount={discount}
              tips={tips}
              finalPrice={finalPrice}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}