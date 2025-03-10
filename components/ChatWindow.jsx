import React, { useState } from "react";
import axios from "axios";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Здравствуйте! Чем могу помочь?", time: new Date().toLocaleTimeString() },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Функция для отправки сообщения в GigaChat
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // Добавляем сообщение пользователя в чат
    const userMessage = { sender: "user", text: inputText, time: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Отправляем запрос к GigaChat
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://gigachat.devices.sberbank.ru/api/v1/models", // Замените на реальный URL API GigaChat
        {
          message: inputText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `ZTY1Mzc2NzctNTRiMi00ZTUzLWEzZGQtYTdlYWZjMTYyNzIzOjJlNGJjYjIwLTgwNjQtNGI4MS1hYWJhLTk3NjQ5ZDYwOWYwNA==`, // Замените на ваш API-ключ
          },
        }
      );

      const botMessage = { sender: "bot", text: response.data.response, time: new Date().toLocaleTimeString() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      const errorMessage = { sender: "bot", text: "Произошла ошибка. Пожалуйста, попробуйте позже.", time: new Date().toLocaleTimeString() };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-[400px] h-[500px] bg-white rounded-lg shadow-xl dark:bg-gray-800 overflow-hidden">
      <div className="relative flex items-center justify-between p-6 border-b dark:border-gray-700">
        <h3 className="text-2xl font-semibold dark:text-white">AI Ассистент</h3>
      </div>
      <div className="p-6 space-y-4 overflow-y-auto h-[320px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >
            {msg.sender === "bot" && (
              <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"></div>
            )}
            <div className={msg.sender === "user" ? "order-1" : ""}> 
              <div
                className={`p-3 rounded-lg ${
                  msg.sender === "bot"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "text-white bg-blue-500"
                }`}
              >
                <p className={msg.sender === "bot" ? "text-gray-700 dark:text-gray-300" : ""}>
                  {msg.text}
                </p>
              </div>
              <span className="text-xs leading-none text-gray-500">{msg.time}</span>
            </div>
            {msg.sender === "user" && (
              <div className="flex-shrink-0 w-10 h-10 bg-blue-300 rounded-full"></div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <div className="p-3 bg-gray-100 rounded-lg dark:bg-gray-700">
                <p className="text-gray-700 dark:text-gray-300">Печатает...</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center p-4 border-t dark:border-gray-700">
        <input
          type="text"
          placeholder="Введите сообщение"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="px-4 py-2 ml-4 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;