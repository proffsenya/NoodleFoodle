import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useTheme } from '../src/context/ThemeContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
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
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FeatherIcon 
            icon={isDark ? "sun" : "moon"} 
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* Правый блок: навигация и элементы управления */}
      <div className="flex items-center gap-4">
        {/* Навигация для десктопа */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink
            className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
            to="/"
            style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}
          >
            Главная
          </NavLink>
          <NavLink
            className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
            to="/menu"
            style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}
          >
            Меню
          </NavLink>
          <NavLink
            className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
            to="/contact"
            style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}
          >
            О нас
          </NavLink>
          <NavLink
            className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
            to="/shoppingcart"
            style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}
          >
            Корзина
          </NavLink>
          
          {isAuthenticated ? (
            <div className="relative flex items-center space-x-4">
              <button onClick={handleLogout} className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
                Выйти
              </button>
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center">
                  <img
                    src="/path/to/profile.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Профиль
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Настройки
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
        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FeatherIcon icon={isMenuOpen ? "x" : "menu"} />
        </button>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <nav className="flex flex-col p-4 space-y-4">
            <NavLink
              className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </NavLink>
            <NavLink
              className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              to="/menu"
              onClick={() => setIsMenuOpen(false)}
            >
              Меню
            </NavLink>
            <NavLink
              className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
            >
              О нас
            </NavLink>
            <NavLink
              className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              to="/shoppingcart"
              onClick={() => setIsMenuOpen(false)}
            >
              Корзина
            </NavLink>
            {isAuthenticated ? (
              <>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Выйти
                </button>
                <NavLink
                  to="/profile"
                  className="px-4 py-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Профиль
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Войти
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}