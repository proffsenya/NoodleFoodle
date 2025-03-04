import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { FaHistory, FaGift, FaTag } from "react-icons/fa";

export default function Profile() {
  const [username, setUsername] = useState("Пользователь");
  const [avatar, setAvatar] = useState(null);
  const [address, setAddress] = useState("Улица Примера, 123, Город, Страна");
  const [birthday, setBirthday] = useState("");
  const [phoneName, setPhoneName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const { ref: profileRef, inView: profileInView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const { ref: infoRef, inView: infoInView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const { ref: historyLinkRef, inView: historyLinkInView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const { ref: giftsRef, inView: giftsInView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const { ref: promoCodesRef, inView: promoCodesInView } = useInView({ triggerOnce: true, threshold: 0.5 });

  const userInfo = {
    email: "user@example.com",
    registrationDate: "2023-01-01",
    loyaltyPoints: 150,
    personalizedGifts: [
      "Скидка 10% на следующий заказ",
      "Бесплатная доставка",
      "Подарок на день рождения",
      "Эксклюзивный рецепт",
      "Приглашение на мастер-класс",
    ],
    promoCodes: ["WELCOME10", "SUMMER20", "HOLIDAY15", "FRIENDS50", "NEWYEAR30"],
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

  const toggleAccordion = (index) => {
    setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="min-h-[300vh] flex flex-col text-black bg-white">
      <Header />
      <div className="flex-grow flex flex-col items-center p-10 space-y-48 relative z-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-24 mt-24">
          <div
            ref={profileRef}
            className={`transform transition-all duration-1000 ease-in-out ${profileInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
          >
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8 h-[600px] transform transition-transform">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Профиль</h2>
              <div className="flex justify-center">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Аватар"
                    className="w-48 h-48 rounded-full object-cover border-4 border-gray-900"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center text-gray-900 text-6xl border-4 border-gray-900">
                    👤
                  </div>
                )}
              </div>
              {isEditing ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="mb-6"
                />
              ) : null}
              <div className="w-full text-center">
                {isEditing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition-colors text-xl"
                  />
                ) : (
                  <p className="text-3xl text-gray-900 fade-in">{username}</p>
                )}
              </div>
              <div className="flex justify-center space-x-4 mt-6">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-blue-900 text-white rounded-lg shadow-lg hover:bg-blue-800 transition-colors text-xl"
                  >
                    Сохранить
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors text-xl"
                  >
                    Редактировать
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors text-xl"
                >
                  Выйти
                </button>
              </div>
            </div>
          </div>

          <div
            ref={infoRef}
            className={`transform transition-all duration-1000 ease-in-out ${infoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
          >
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8 h-[600px] transform transition-transform">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Основная информация</h2>
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> {userInfo.email}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Дата регистрации:</strong> {userInfo.registrationDate}
              </p>
              <div className="text-lg text-gray-700">
                <strong>Баллы лояльности:</strong> {userInfo.loyaltyPoints}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${(userInfo.loyaltyPoints / 1000) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-lg text-gray-700 mt-6">
                <strong>Адрес:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition-colors text-xl"
                  />
                ) : (
                  <p className="text-xl text-gray-900 fade-in">{address}</p>
                )}
              </div>
              <div className="text-lg text-gray-700 mt-6">
                <strong>День рождения:</strong>
                {isEditing ? (
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition-colors text-xl"
                  />
                ) : (
                  <p className="text-xl text-gray-900 fade-in">{birthday || "Не указано"}</p>
                )}
              </div>
              <div className="text-lg text-gray-700 mt-6">
                <strong>Имя для звонка:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={phoneName}
                    onChange={(e) => setPhoneName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition-colors text-xl"
                  />
                ) : (
                  <p className="text-xl text-gray-900 fade-in">{phoneName || "Не указано"}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <img
            src="/img/phpr1.jpg"
            alt="Декоративная лапшой"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div
          ref={historyLinkRef}
          className={`w-full transform transition-all duration-1000 ease-in-out ${historyLinkInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <Link
            to="/history"
            className="flex items-center justify-center space-x-4 px-10 py-8 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-2xl font-bold"
          >
            <FaHistory className="text-3xl" />
            <span>Перейти к истории заказов и рецептов</span>
          </Link>
        </div>

        <div className="w-full flex justify-center">
          <img
            src="/img/phpr2.jpg"
            alt="Декоративная лапшой"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-24">
          <div
            ref={giftsRef}
            className={`transform transition-all duration-1000 ease-in-out ${giftsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
          >
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8 transform transition-transform">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion(1)}
              >
                <div className="flex items-center space-x-4">
                  <FaGift className="text-3xl text-purple-600" />
                  <h3 className="text-3xl font-bold text-gray-900">Подарки</h3>
                </div>
                <span className="text-2xl text-gray-900">{activeAccordion === 1 ? "-" : "+"}</span>
              </div>
              {activeAccordion === 1 && (
                <ul className="list-disc list-inside space-y-4 mt-6">
                  {userInfo.personalizedGifts.map((gift, index) => (
                    <li key={index} className="text-gray-900 text-lg">
                      {gift}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div
            ref={promoCodesRef}
            className={`transform transition-all duration-1000 ease-in-out ${promoCodesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
          >
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8 transform transition-transform">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion(2)}
              >
                <div className="flex items-center space-x-4">
                  <FaTag className="text-3xl text-blue-600" />
                  <h3 className="text-3xl font-bold text-gray-900">Промокоды</h3>
                </div>
                <span className="text-2xl text-gray-900">{activeAccordion === 2 ? "-" : "+"}</span>
              </div>
              {activeAccordion === 2 && (
                <ul className="list-disc list-inside space-y-4 mt-6">
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
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <img
            src="/img/phpr3.jpg"
            alt="Декоративная лапшой"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
