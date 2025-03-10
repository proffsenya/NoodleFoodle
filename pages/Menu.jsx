import Header from "../components/Header";
import Footer from "../components/Footer";
import {dishes} from "../data/data";
import {Link} from "react-router-dom";
import { useState } from "react";

export default function Menu() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900">
      <Header />
      <Layout />
      <Footer />
      <SupportButton toggleChat={toggleChat} />
      {isChatOpen && <ChatWindow toggleChat={toggleChat} />}
    </div>
  );
}

function Layout() {
  return (
    <section className="px-4 py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <h2 className="mt-10 text-3xl font-bold text-center mb-11 dark:text-white">Меню</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {dishes.map((item) => (
            <MenuConst MenuObj={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuConst({MenuObj}){
  return(
    <div className="flex flex-col h-full overflow-hidden transition-colors duration-300 bg-white rounded-lg shadow-md dark:bg-gray-700">
      <img
        src={MenuObj.image}
        alt={MenuObj.name}
        className="object-cover w-full h-48 dark:brightness-90"
      />
      <div className="flex flex-col flex-grow p-4">
        <h3 className="mb-2 text-xl font-semibold dark:text-white">{MenuObj.name}</h3>
        <p className="flex-grow text-gray-600 dark:text-gray-300">{MenuObj.description}</p>
        <div className="flex items-center justify-between pt-4 mt-auto">
          <span className="text-xl font-bold dark:text-white">{MenuObj.price}</span>
          <Link to={MenuObj.id === 1 ? `/customproduct` : `/productdetails/${MenuObj.id}`}>
            <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600">
              Перейти
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function SupportButton({ toggleChat }) {
  return (
    <button
      onClick={toggleChat}
      className="fixed bottom-4 right-4 flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full shadow-lg text-white hover:bg-blue-600 transition-transform transform hover:scale-110"
    >
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        ></path>
      </svg>
    </button>
  );
}

function ChatWindow({ toggleChat }) {
  return (
    <div className="fixed bottom-4 right-4 w-[400px] h-[500px] bg-white rounded-lg shadow-xl dark:bg-gray-800 overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative p-6 border-b dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-2xl font-semibold dark:text-white">Поддержка</h3>
        <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div className="p-6 space-y-4 overflow-y-auto h-[320px]">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          <div>
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
              <p className="text-gray-700 dark:text-gray-300">Здравствуйте! Как я могу помочь вам сегодня?</p>
            </div>
            <span className="text-xs text-gray-500 leading-none">10:30 AM</span>
          </div>
        </div>
        <div className="flex items-start space-x-3 justify-end">
          <div className="order-1">
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <p>Привет! У меня есть вопрос.</p>
            </div>
            <span className="text-xs text-gray-500 leading-none">10:32 AM</span>
          </div>
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-300"></div>
        </div>
      </div>
      <div className="p-4 border-t dark:border-gray-700 flex items-center">
        <input
          type="text"
          placeholder="Введите сообщение"
          className="flex-grow px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
          Отправить
        </button>
      </div>
    </div>
  );
}
