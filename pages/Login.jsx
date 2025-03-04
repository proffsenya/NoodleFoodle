import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../src/index.css";

const testAccount = {
  email: "test@example.com",
  password: "password123",
};

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === testAccount.email && password === testAccount.password) {
      setIsLoggedIn(true);
      navigate("/profile");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <div className="flex items-center justify-center flex-grow pt-10 my-20">
        <LoginSection
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          error={error}
        />
      </div>
      <Footer />
    </div>
  );
}

function LoginSection({ email, setEmail, password, setPassword, handleLogin, error }) {
  return (
    <section id="login" className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/30 transition-colors duration-300">
      <h1 className="mb-4 text-4xl font-bold text-center text-gray-800 dark:text-white">Авторизация</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block mb-2 text-lg text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите ваш email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-lg text-gray-700 dark:text-gray-300">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите ваш пароль"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            required
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors duration-300"
        >
          Войти
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-blue-500 hover:underline dark:text-indigo-400">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </section>
  );
}