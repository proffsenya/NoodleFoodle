import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, logout } from '../src/features/client/clientSlice';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link, useParams } from 'react-router-dom'; // Добавлен useParams для получения id из URL
import FeatherIcon from 'feather-icons-react';

export default function Profile() {
  const [username, setUsername] = useState('Пользователь');
  const [avatar, setAvatar] = useState(null);
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [openAccordions, setOpenAccordions] = useState([]);

  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.client);
  const { id } = useParams(); // Получаем id из URL

  // Загружаем данные профиля при монтировании компонента
  useEffect(() => {
    if (id) {
      dispatch(fetchProfile(id));
    }
  }, [dispatch, id]);

  // Обновляем локальное состояние при изменении данных клиента
  useEffect(() => {
    if (client) {
      setUsername(client.fullName || 'Пользователь');
      setAddress(client.address || '');
      setBirthdate(client.birthdate || '');
      setPhone(client.phone || '');
    }
  }, [client]);

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
    const profileData = {
      fullName: username,
      address,
      birthdate,
      phone,
    };
    dispatch(updateProfile({ id: client.id, profileData }));
    setIsEditing(false);
    alert('Профиль сохранен!');
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Скопировано в буфер обмена: ' + text);
  };

  const userInfo = {
    email: client?.email || 'user@example.com',
    loyaltyPoints: client?.loyaltyPoints || 150,
    personalizedGifts: [
      'Скидка 10% на следующий заказ',
      'Бесплатная доставка',
      'Подарок на день рождения',
      'Эксклюзивный рецепт',
      'Приглашение на мастер-класс',
    ],
    promoCodes: ['WELCOME10', 'SUMMER20', 'HOLIDAY15', 'FRIENDS50', 'NEWYEAR30'],
  };

  return (
    <div className="min-h-[150vh] flex flex-col text-black bg-white">
      <Header />
      <div className="relative z-10 flex flex-col items-center flex-grow p-10 space-y-20">
        <div className="grid w-full grid-cols-1 gap-24 mt-24 md:grid-cols-2">
          <div>
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8 h-[500px] transform transition-transform">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Профиль</h2>
              <div className="flex justify-center">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Аватар"
                    className="object-cover w-48 h-48 border-4 border-gray-900 rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-48 h-48 text-6xl text-gray-900 bg-gray-300 border-4 border-gray-900 rounded-full">
                    <FeatherIcon icon="user" className="w-[100px] h-[100px] stroke-[1px]" />
                  </div>
                )}
              </div>
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="mb-6"
                />
              )}
              <div className="w-full mt-6 text-center">
                {isEditing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 text-xl transition-colors border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                ) : (
                  <p className="text-3xl text-gray-900 fade-in">{username}</p>
                )}
              </div>
              <div className="flex justify-center mt-6 space-x-4">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 text-xl text-white transition-colors bg-blue-900 rounded-lg shadow-lg hover:bg-blue-800"
                  >
                    Сохранить
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 text-xl text-white transition-colors bg-gray-900 rounded-lg shadow-lg hover:bg-gray-800"
                  >
                    Редактировать
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 text-xl text-white transition-colors bg-red-600 rounded-lg shadow-lg hover:bg-red-700"
                >
                  Выйти
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-y-auto bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8 h-[500px] transform transition-transform">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Основная информация</h2>
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> {client?.email || 'user@example.com'}
              </p>
              <div className="mt-6 text-lg text-gray-700">
                <strong>Баллы лояльности:</strong> {userInfo.loyaltyPoints}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${(userInfo.loyaltyPoints / 1000) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-6 text-lg text-gray-700">
                <strong>Адрес:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 text-xl transition-colors border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                ) : (
                  <p className="text-xl text-gray-900 fade-in">{address}</p>
                )}
              </div>
              <div className="mt-6 text-lg text-gray-700">
                <strong>День рождения:</strong>
                {isEditing ? (
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="w-full px-4 py-3 text-xl transition-colors border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                ) : (
                  <p className="text-xl text-gray-900 fade-in">{birthdate || 'Не указано'}</p>
                )}
              </div>
              <div className="mt-6 text-lg text-gray-700">
                <strong>Номер телефона:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 text-xl transition-colors border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                ) : (
                  <p className="text-xl text-gray-900 fade-in">{phone || 'Не указано'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <HistoryLinks />

        <div className="grid w-full grid-cols-1 gap-24 md:grid-cols-2">
          <GiftsSection
            userInfo={userInfo}
            openAccordions={openAccordions}
            toggleAccordion={toggleAccordion}
          />
          <PromoCodesSection
            userInfo={userInfo}
            openAccordions={openAccordions}
            toggleAccordion={toggleAccordion}
            copyToClipboard={copyToClipboard}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function HistoryLinks() {
  return (
    <div className="flex grid w-full grid-cols-1 gap-24 mt-1 transition-all duration-1000 ease-in-out transform md:">
      <Link
        to="/history"
        className="flex items-center justify-between px-10 py-8 space-x-4 text-2xl font-bold text-gray-900 transition-all duration-300 shadow-lg rounded-xl hover:shadow-xl hover:scale-105"
      >
        <div className="flex items-center space-x-4">
          <FeatherIcon icon="shopping-bag" className="text-green-500 w-[32px] h-[32px]" />
          <span>Перейти к истории заказов</span>
        </div>
        <FeatherIcon icon="arrow-right" className="w-[18px] h-[18px]" />
      </Link>
      <Link
        to="/recipe"
        className="flex items-center justify-between px-10 py-8 space-x-4 text-2xl font-bold text-gray-900 transition-all duration-300 shadow-lg rounded-xl hover:shadow-xl hover:scale-105"
      >
        <div className="flex items-center space-x-4">
          <FeatherIcon icon="book" className="text-yellow-700 w-[32px] h-[32px]" />
          <span>Перейти к сохраненным рецептам</span>
        </div>
        <FeatherIcon icon="arrow-right" className="w-[18px] h-[18px]" />
      </Link>
    </div>
  );
}

function GiftsSection({ userInfo, openAccordions, toggleAccordion }) {
  return (
    <div className="p-8 transition-transform transform shadow-xl bg-white/90 backdrop-blur-md rounded-xl">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => toggleAccordion(1)}
      >
        <div className="flex items-center space-x-4">
          <FeatherIcon icon="gift" className="text-purple-600 w-[32px] h-[32px]" />
          <h3 className="text-2xl font-bold text-gray-900">Подарки</h3>
        </div>
        <span className="text-2xl text-gray-900">{openAccordions.includes(1) ? <FeatherIcon icon="minus" className="w-[18px] h-[18px]" /> : <FeatherIcon icon="plus" className="w-[18px] h-[18px]" />}</span>
      </div>
      {openAccordions.includes(1) && (
        <ul className="mt-6 space-y-4 list-disc list-inside">
          {userInfo.personalizedGifts.map((gift, index) => (
            <li key={index} className="text-lg text-gray-900">
              {gift}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PromoCodesSection({ userInfo, openAccordions, toggleAccordion, copyToClipboard }) {
  return (
    <div className="p-8 transition-transform transform shadow-xl bg-white/90 backdrop-blur-md rounded-xl">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => toggleAccordion(2)}
      >
        <div className="flex items-center space-x-4">
          <FeatherIcon icon="tag" className="text-blue-600 w-[32px] h-[32px]" />
          <h3 className="text-2xl font-bold text-gray-900">Промокоды</h3>
        </div>
        <span className="text-2xl text-gray-900">{openAccordions.includes(2) ? <FeatherIcon icon="minus" className="w-[18px] h-[18px]" /> : <FeatherIcon icon="plus" className="w-[18px] h-[18px]" />}</span>
      </div>
      {openAccordions.includes(2) && (
        <ul className="mt-6 space-y-4 list-disc list-inside">
          {userInfo.promoCodes.map((code, index) => (
            <li key={index} className="flex items-center justify-between text-lg text-gray-900">
              {code}
              <button
                onClick={() => copyToClipboard(code)}
                className="text-blue-500 transition-colors hover:underline focus:outline-none"
              >
                Копировать
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}