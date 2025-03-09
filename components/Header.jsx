import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useTheme } from '../src/context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../src/features/client/clientSlice';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark, toggleTheme } = useTheme();

  const { client } = useSelector((state) => state.client);
  const isAuthenticated = Boolean(client);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 mx-auto bg-white shadow-sm dark:bg-gray-900 dark:text-white">
      {/* Левый блок: логотип и иконка темы */}
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold">NoodleFoodle</span>
        <button
          onClick={toggleTheme}
          className="p-2 transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FeatherIcon icon={isDark ? 'sun' : 'moon'} className="w-5 h-5" />
        </button>
      </div>

      {/* Правый блок: навигация и элементы управления */}
      <div className="flex items-center gap-4">
        {/* Навигация для десктопа */}
        <nav className="items-center hidden space-x-6 md:flex">
          <NavLink className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" to="/">Главная</NavLink>
          <NavLink className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" to="/menu">Меню</NavLink>
          <NavLink className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" to="/contact">О нас</NavLink>
          <NavLink className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" to="/shoppingcart">Корзина</NavLink>
          
          {isAuthenticated ? (
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center">
                  <img
                    src="/path/to/profile.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white border rounded shadow-lg dark:bg-gray-800 dark:border-gray-700">
                    <NavLink
                      to={`/clients/${client.id}`}
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Профиль
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Войти
            </NavLink>
          )}
        </nav>

        {/* Бургер-меню для мобильных */}
        <button className="p-2 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FeatherIcon icon={isMenuOpen ? 'x' : 'menu'} />
        </button>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 bg-white shadow-lg top-full md:hidden dark:bg-gray-900">
          <nav className="flex flex-col p-4 space-y-4">
            <NavLink className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" to="/" onClick={() => setIsMenuOpen(false)}>Главная</NavLink>
            <NavLink className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" to="/menu" onClick={() => setIsMenuOpen(false)}>Меню</NavLink>
            <NavLink className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" to="/contact" onClick={() => setIsMenuOpen(false)}>О нас</NavLink>
            <NavLink className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" to="/shoppingcart" onClick={() => setIsMenuOpen(false)}>Корзина</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink
                  to={`/clients/${client.id}`}
                  className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Профиль
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Выйти
                </button>
              </>
            ) : (
              <NavLink to="/login" className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600" onClick={() => setIsMenuOpen(false)}>
                Войти
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}