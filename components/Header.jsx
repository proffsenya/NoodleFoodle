import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 mx-auto bg-white shadow-sm">
      <div className="flex items-center">
        <span className="text-xl font-bold">NoodleFoodle</span>
      </div>
      <nav className="items-center hidden space-x-6 md:flex">
        <NavLink
          className="text-gray-700 hover:text-black"
          to="/"
          style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : '' })}
        >
          Главная
        </NavLink>
        <NavLink
          className="text-gray-700 hover:text-black"
          to="/menu"
          style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : '' })}
        >
          Меню
        </NavLink>
        <NavLink
          className="text-gray-700 hover:text-black"
          to="/contact"
          style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : '' })}
        >
          О нас
        </NavLink>
        <NavLink
          className="text-gray-700 hover:text-black"
          to="/shoppingcart"
          style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : '' })}
        >
          Корзина
        </NavLink>
        {isAuthenticated ? (
          <div className="relative flex items-center space-x-4">
            <button onClick={handleLogout} className="text-gray-700 hover:text-black">
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
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Профиль
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Настройки
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
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
            className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800"
          >
            Войти
          </NavLink>
        )}
      </nav>
    </header>
  );
}
