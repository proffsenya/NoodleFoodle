import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginClient, reset } from '../src/features/client/clientSlice';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../src/index.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message, client } = useSelector((state) => state.client);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    dispatch(loginClient(loginData));
  };

  React.useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess && client?.id) {
      navigate(`/clients/${client.id}`); // Перенаправляем на страницу профиля с id
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch, client]);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900">
      <Header />
      <div className="flex items-center justify-center flex-grow pt-10 my-20">
        <section id="login" className="w-full max-w-md p-6 transition-colors duration-300 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30">
          <h1 className="mb-4 text-4xl font-bold text-center text-gray-800 dark:text-white">Вход</h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-lg text-gray-700 dark:text-gray-300">
                Почта
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Введите вашу почту"
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
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Введите ваш пароль"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-white transition-colors duration-300 bg-black rounded-md hover:bg-gray-800 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              {isLoading ? 'Загрузка...' : 'Войти'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Нет аккаунта?{' '}
              <Link to="/register" className="text-blue-500 hover:underline dark:text-indigo-400">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}