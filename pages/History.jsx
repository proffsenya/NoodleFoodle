import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const History = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2023-10-01",
      items: ["Лапша Удон", "Лапша Рамен"],
      total: "1200 руб.",
    },
    {
      id: 2,
      date: "2023-09-25",
      items: ["Лапша Вьетнамская", "Лапша Соба"],
      total: "850 руб.",
    },
    {
      id: 3,
      date: "2023-09-18",
      items: ["Лапша Фо", "Лапша Якисоба"],
      total: "1500 руб.",
    },
    {
      id: 4,
      date: "2023-09-10",
      items: ["Лапша Мишлен", "Лапша Урамаки"],
      total: "1300 руб.",
    },
  ]);

  const fetchOrdersAndRecipes = async () => {
  };

  useEffect(() => {
    fetchOrdersAndRecipes();
  }, []);

  const navigate = useNavigate();

  const repeatOrder = (order) => {
    const itemsParam = encodeURIComponent(JSON.stringify(order.items));
    navigate(`/cart?items=${itemsParam}`);
  };

  return (
    <div className="flex flex-col min-h-screen text-black bg-white">
      <Header />
      <div className="flex flex-col items-center flex-grow p-10 space-y-12">
        <h1 className="mt-16 mb-8 text-4xl font-bold text-gray-900">История заказов</h1>
        <div className="w-full max-w-4xl space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 transition-transform transform bg-white shadow-xl rounded-xl hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Заказ #{order.id}</h2>
                <Link
                  to={`/order/${order.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Подробнее
                </Link>
              </div>
              <p className="text-gray-600">Дата: {order.date}</p>
              <ul className="pl-4 mt-2 list-disc list-inside">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-bold text-gray-900">Итого: {order.total}</p>
              <button
                onClick={() => repeatOrder(order)}
                className="px-6 py-2 mt-4 text-white transition-colors bg-green-600 rounded-lg shadow-lg hover:bg-green-700"
              >
                Повторить
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default History;
