import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Profile() {
  const [username, setUsername] = useState("Пользователь");
  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("favorites");

  const userInfo = {
    email: "user@example.com",
    registrationDate: "2023-01-01",
    loyaltyPoints: 150,
    orderHistory: [
      { id: 1, date: "2023-02-01", total: "$50", items: ["Салат Цезарь", "Стейк"] },
      { id: 2, date: "2023-03-15", total: "$75", items: ["Паста Карбонара", "Тирамису"] },
    ],
    savedRecipes: [
      { id: 1, name: "Салат Цезарь", ingredients: ["Курица", "Салат", "Сухарики", "Соус"] },
      { id: 2, name: "Паста Карбонара", ingredients: ["Паста", "Бекон", "Сыр", "Яйцо"] },
    ],
    personalizedGifts: ["Скидка 10% на следующий заказ"],
    promoCodes: ["WELCOME10", "SUMMER20", "HOLIDAY15"],
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Профиль сохранен!");
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Скопировано в буфер обмена: " + text);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      <Header />
      <div className="flex-grow flex justify-center items-start p-10">
        <div className="w-full max-w-6xl flex flex-col space-y-10 bg-white rounded-xl shadow-lg p-8">
          <div className="p-6 bg-white rounded-lg shadow-md space-y-6 fade-in">
            <div className="flex justify-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Аватар"
                  className="w-48 h-48 rounded-full object-cover border-4 border-gray-900 hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center text-gray-900 text-6xl border-4 border-gray-900 hover:scale-105 transition-transform">
                  👤
                </div>
              )}
            </div>
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mb-4"
              />
            )}
            <div className="w-full text-center">
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition-colors text-xl"
                />
              ) : (
                <p className="text-2xl text-gray-900 fade-in">{username}</p>
              )}
            </div>
            <div className="flex justify-center space-x-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="w-full px-6 py-3 bg-blue-900 text-white rounded-lg shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-colors text-xl"
                >
                  Сохранить
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors text-xl"
                >
                  Редактировать
                </button>
              )}
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors text-xl"
              >
                Выйти
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-8 mb-6">
            <button
              onClick={() => setActiveTab("favorites")}
              className={`relative flex flex-col items-center p-4 rounded-lg shadow-lg transition-transform ${activeTab === "favorites" ? "scale-105" : "hover:scale-105"}`}
              style={{ width: "150px", height: "150px" }}
            >
              <img
                src="/img/y2.png"
                alt="Favorites"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </button>
            <button
              onClick={() => setActiveTab("orderHistory")}
              className={`relative flex flex-col items-center p-4 rounded-lg shadow-lg transition-transform ${activeTab === "orderHistory" ? "scale-105" : "hover:scale-105"}`}
              style={{ width: "150px", height: "150px" }}
            >
              <img
                src="/img/y3.png"
                alt="Order History"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </button>
            <button
              onClick={() => setActiveTab("personalizedGifts")}
              className={`relative flex flex-col items-center p-4 rounded-lg shadow-lg transition-transform ${activeTab === "personalizedGifts" ? "scale-105" : "hover:scale-105"}`}
              style={{ width: "150px", height: "150px" }}
            >
              <img
                src="/img/y1.png"
                alt="Gifts"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </button>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md space-y-4 fade-in">
            {activeTab === "favorites" && (
              <div>
                <ul className="list-disc list-inside space-y-3">
                  {userInfo.savedRecipes.map((recipe) => (
                    <li key={recipe.id} className="text-gray-900 text-lg">
                      <strong>{recipe.name}</strong>
                      <ul className="list-circle list-inside pl-6 space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-gray-800">{ingredient}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === "orderHistory" && (
              <div>
                <ul className="list-disc list-inside space-y-3">
                  {userInfo.orderHistory.map((order) => (
                    <li key={order.id} className="text-gray-900 text-lg">
                      <strong>{order.date}</strong> - {order.total}
                      <ul className="list-circle list-inside pl-6 space-y-2">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-gray-800">{item}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === "personalizedGifts" && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Персонализированные подарки</h3>
                <ul className="list-disc list-inside space-y-3">
                  {userInfo.personalizedGifts.map((gift, index) => (
                    <li key={index} className="text-gray-900 text-lg">
                      {gift}
                    </li>
                  ))}
                </ul>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2 mt-6">Доступные промокоды</h3>
                <ul className="list-disc list-inside space-y-3">
                  {userInfo.promoCodes.map((code, index) => (
                    <li key={index} className="text-gray-900 text-lg flex justify-between items-center">
                      {code}
                      <button
                        onClick={() => copyToClipboard(code)}
                        className="text-blue-500 hover:underline focus:outline-none transition-colors"
                      >
                        Копировать
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
