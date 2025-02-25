import { NavLink } from "react-router-dom"
import { useState } from "react"
import FeatherIcon from 'feather-icons-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-40 py-4 mx-auto bg-white shadow-sm">
      <div className="flex items-center">
        <span className="text-xl font-bold">NoodleFoodle</span>
      </div>

      {/* Burger button */}
      <button
        className="p-2 md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FeatherIcon icon={isMenuOpen ? "x" : "menu"} />
      </button>

      {/* Navigation */}
      <nav className={`absolute md:relative top-full left-0 right-0 md:flex md:items-center md:space-x-6 
        ${isMenuOpen ? 'block bg-white shadow-lg md:shadow-none' : 'hidden'} 
        transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col md:flex-row p-4 md:p-0 space-y-4 md:space-y-0">
          <NavLink
            className="text-gray-700 hover:text-black px-4 py-2"
            to={"/"}
            style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}
            onClick={() => setIsMenuOpen(false)}
          >
            Главная
          </NavLink>
          <NavLink
            className="text-gray-700 hover:text-black px-4 py-2"
            to={"/menu"}
            style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}
            onClick={() => setIsMenuOpen(false)}
          >
            Меню
          </NavLink>
          <NavLink
            className="text-gray-700 hover:text-black px-4 py-2"
            to={"/contact"}
            style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}
            onClick={() => setIsMenuOpen(false)}
          >
            О нас
          </NavLink>
          <NavLink
            className="text-gray-700 hover:text-black px-4 py-2"
            to={"/shoppingcart"}
            style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}
            onClick={() => setIsMenuOpen(false)}
          >
            Корзина
          </NavLink>
          <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 md:ml-4">
            Войти
          </button>
        </div>
      </nav>
    </header>
  )
}
