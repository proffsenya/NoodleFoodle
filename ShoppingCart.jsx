import React, { useState } from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ShoppingCart() {
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

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = 0; // Логика для скидки
  const finalPrice = totalPrice - discount;

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
    if (discountCode === "SUMMER2025") {
      alert("Скидка 10% применена!");
      // Здесь можно обновить состояние для применения скидки
    } else {
      alert("Неверный код скидки.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center flex-grow p-8 space-y-12" style={{ paddingLeft: "30px", paddingRight: "30px", paddingBottom: "90px" }}>
        <h1 className="mt-16 mb-8 text-4xl font-bold text-gray-900">Корзина</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
            <p className="text-2xl text-gray-700">Ваша корзина пуста.</p>
            <Link
              to="/menu"
              className="px-6 py-3 mt-6 text-lg text-white transition-colors bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
            >
              Перейти к меню
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-md">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center p-4 border-b border-gray-200">
                <img src={item.image} alt={item.name} className="object-cover w-24 h-24 rounded-lg" />
                <div className="flex-grow ml-4">
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <p className="text-lg text-gray-700">Цена: {item.price} ₽</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-xl">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}

            <div className="p-4">
              <div className="flex flex-col-reverse items-center justify-between mt-8 md:flex-row">
                <div className="flex flex-col mt-4 md:mt-0">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Введите код скидки"
                    className="w-64 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    onClick={applyDiscount}
                    className="px-6 py-2 mt-2 text-white transition-colors bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
                  >
                    Применить промокод
                  </button>
                </div>
                <Link
                  to="/checkout"
                  className="w-full px-6 py-3 text-lg text-white transition-colors bg-green-600 rounded-lg shadow-lg hover:bg-green-700 md:w-auto md:ml-4"
                >
                  Оформить заказ
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
