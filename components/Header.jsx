import { NavLink } from "react-router-dom"

export default function Header(){
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-40 py-4 mx-auto bg-white shadow-sm">
          <div className="flex items-center">
            <span className="text-xl font-bold">NoodleFoodle</span>
          </div>
          <nav className="items-center hidden space-x-6 md:flex">
            <NavLink className="text-gray-700 hover:text-black" to = {"/"}>Главная</NavLink>
            <NavLink className="text-gray-700 hover:text-black" to = {"/"}>Доставка</NavLink>
            <NavLink className="text-gray-700 hover:text-black" to = {"menu"}>Меню</NavLink>
            <NavLink className="text-gray-700 hover:text-black" to = {"contact"}>О нас</NavLink>
            <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800">
              Заказать
            </button>
          </nav>
      </header>
  )
}