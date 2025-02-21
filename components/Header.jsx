import { NavLink } from "react-router-dom"

export default function Header(){
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-40 py-4 mx-auto bg-white shadow-sm">
          <div className="flex items-center">
            <span className="items-center text-xl font-bold sm:items-center md:">NoodleFoodle</span>
          </div>
          <nav className="items-center hidden space-x-6 md:flex">
            <NavLink className="text-gray-700 hover:text-black" to = {"/"} style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}>Главная</NavLink>
            <NavLink className="text-gray-700 hover:text-black" to = {"/menu"} style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}>Меню</NavLink>
            <NavLink className="text-gray-700 hover:text-black" to = {"/contact"} style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}>О нас</NavLink>
            <NavLink className="text-gray-700 hover:text-black" to = {"/shoppingcart"} style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "" })}>Корзина</NavLink>
            <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800">
              Войти
            </button>
          </nav>
      </header>
  )
}