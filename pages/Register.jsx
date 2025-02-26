import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../src/index.css";

export default function Register() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div
        className="flex-grow flex items-center my-20 pt-10 justify-center bg-cover bg-center" // Change to your GIF URL
      >
        <RegisterSection />
      </div>
      <Footer />
    </div>
  );
}

function RegisterSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    cardNumber: "",
    birthdate: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardNumberPattern = /^\d{16}$/;

    if (!formData.email.match(emailPattern)) {
      newErrors.email = "Введите корректный email";
    }

    if (!formData.cardNumber.match(cardNumberPattern)) {
      newErrors.cardNumber = "Введите корректный номер карты (16 цифр)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Регистрация успешна!");
    }
  };

  return (
    <section id="register" className="w-full max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
      <h1 className="mb-4 text-4xl font-bold text-center text-gray-800">
        Регистрация
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName" className="block mb-2 text-lg text-gray-700">
            ФИО
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Введите ваше полное имя"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-2 text-lg text-gray-700">
            Адрес
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Введите ваш адрес"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber" className="block mb-2 text-lg text-gray-700">
            Номер карты
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="Введите номер вашей карты"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.cardNumber ? "ring-red-500" : "ring-blue-500"
            }`}
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
          )}
        </div>
        <div>
          <label htmlFor="birthdate" className="block mb-2 text-lg text-gray-700">
            Дата рождения
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-lg text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Введите ваш email"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "ring-red-500" : "ring-blue-500"
            }`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-lg text-gray-700">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Введите ваш пароль"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-lg text-gray-700">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}
