import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Profile() {
  const [username, setUsername] = useState("Пользователь");
  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState({
    location: "",
    website: "",
    bio: "",
    travelTips: "",
  });

  // Пример данных, которые пользователь ввел при регистрации
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
    promoCodes: ["WELCOME10", "SUMMER20"],
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
    // Здесь можно добавить логику для сохранения данных на сервере
    setIsEditing(false);
    alert("Профиль сохранен!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutMe((prevAboutMe) => ({
      ...prevAboutMe,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-start p-10">
        <div className="w-full max-w-6xl flex flex-row space-x-10 bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
          {/* Left Column: Profile and Editing Section */}
          <div className="w-1/3 p-4 bg-gray-50 rounded-lg flex flex-col items-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-800 text-center">Профиль</h1>
            <div className="mb-4 flex justify-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Аватар"
                  className="w-40 h-40 rounded-full object-cover"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-5xl">
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
            <div className="mb-4 w-full">
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg text-gray-700 text-center">{username}</p>
              )}
            </div>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Сохранить
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Редактировать
              </button>
            )}
          </div>

          {/* Right Column: Information Section */}
          <div className="w-2/3 p-4 bg-gray-50 rounded-lg flex flex-col space-y-6">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Основная информация</h2>
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> {userInfo.email}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Дата регистрации:</strong> {userInfo.registrationDate}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Баллы лояльности:</strong> {userInfo.loyaltyPoints}
              </p>
            </div>

            <div className="flex flex-col space-y-6">
              {/* История заказов */}
              <div className="bg-white rounded-lg shadow-md p-6 flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">История заказов</h3>
                <ul className="list-disc list-inside">
                  {userInfo.orderHistory.map((order) => (
                    <li key={order.id} className="text-gray-700 mb-2">
                      <strong>{order.date}</strong> - {order.total}
                      <ul className="list-circle list-inside pl-5">
                        {order.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Сохраненные рецепты */}
              <div className="bg-white rounded-lg shadow-md p-6 flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Сохраненные рецепты</h3>
                <ul className="list-disc list-inside">
                  {userInfo.savedRecipes.map((recipe) => (
                    <li key={recipe.id} className="text-gray-700 mb-2">
                      <strong>{recipe.name}</strong>
                      <ul className="list-circle list-inside pl-5">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Персонализированные подарки */}
              <div className="bg-white rounded-lg shadow-md p-6 flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Персонализированные подарки</h3>
                <ul className="list-disc list-inside">
                  {userInfo.personalizedGifts.map((gift, index) => (
                    <li key={index} className="text-gray-700">
                      {gift}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Промокоды */}
              <div className="bg-white rounded-lg shadow-md p-6 flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Промокоды</h3>
                <ul className="list-disc list-inside">
                  {userInfo.promoCodes.map((code, index) => (
                    <li key={index} className="text-gray-700">
                      {code}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}