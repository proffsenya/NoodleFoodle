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

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Рецепт 1: Лапша с креветками",
      ingredients: ["Лапша", "Креветки", "Овощи", "Соевый соус", "Имбирь"],
    },
    {
      id: 2,
      name: "Рецепт 2: Рамен с курицей",
      ingredients: ["Рамен", "Курица", "Яйцо", "Зеленый лук", "Чеснок"],
    },
    {
      id: 3,
      name: "Рецепт 3: Вьетнамская лапша с говядиной",
      ingredients: ["Вьетнамская лапша", "Говядина", "Огурец", "Морковь", "Перец чили"],
    },
    {
      id: 4,
      name: "Рецепт 4: Соба с тофу",
      ingredients: ["Соба", "Тофу", "Шпинат", "Кунжут", "Соевый соус"],
    },
    {
      id: 5,
      name: "Рецепт 5: Якисоба с морепродуктами",
      ingredients: ["Якисоба", "Морепродукты", "Капуста", "Морковь", "Соус Якисоба"],
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
    <div className="min-h-screen bg-white flex flex-col text-black">
      <Header />
      <div className="flex-grow flex flex-col items-center p-10 space-y-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-16">История заказов</h1>
        <div className="w-full max-w-4xl space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-xl p-6 transform transition-transform hover:scale-105"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Заказ #{order.id}</h2>
                <Link
                  to={`/order/${order.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Подробнее
                </Link>
              </div>
              <p className="text-gray-600">Дата: {order.date}</p>
              <ul className="list-disc list-inside pl-4 mt-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-900 font-bold mt-4">Итого: {order.total}</p>
              <button
                onClick={() => repeatOrder(order)}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors"
              >
                Повторить
              </button>
            </div>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-16">Рецепты из конструктора</h1>
        <div className="w-full max-w-4xl space-y-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-xl p-6 transform transition-transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{recipe.name}</h2>
              <ul className="list-disc list-inside pl-4 mt-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default History;
