import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Checkout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center flex-grow p-12 space-y-12" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
        <h1 className="mt-16 mb-8 text-4xl font-bold text-gray-900">Оформление заказа</h1>
        <form className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
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
          <button
            type="submit"
            className="w-full px-6 py-3 text-white transition-colors bg-green-600 rounded-lg shadow-lg hover:bg-green-700"
          >
            Подтвердить заказ
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
