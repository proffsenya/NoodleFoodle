import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center p-12 space-y-12" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-16">Оформление заказа</h1>
        <form className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="name">
              Имя
            </label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-3 w-full"
              id="name"
              type="text"
              placeholder="Введите ваше имя"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="address">
              Адрес
            </label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-3 w-full"
              id="address"
              type="text"
              placeholder="Введите ваш адрес"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="phone">
              Телефон
            </label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-3 w-full"
              id="phone"
              type="tel"
              placeholder="Введите ваш телефон"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-3 w-full"
              id="email"
              type="email"
              placeholder="Введите ваш email"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors w-full"
          >
            Подтвердить заказ
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
