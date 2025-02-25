import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Header />
      <Contact_container />
      <Footer />
    </>
  );
}

function Contact_container() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
    improvement: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Спасибо за вашу обратную связь!');
    console.log('Отправленные данные:', { ...feedback, rating });
  };

  return (
    <div className="pt-16 md:pt-20">
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h1 className="mb-8 md:mb-12 text-2xl md:text-4xl font-bold text-center">
            Посетить NoodleFoodle
          </h1>

          <Upper_Blocks />

          <div className="bg-white rounded-lg shadow-md overflow-hidden h-[300px] md:h-[400px] mb-8 md:mb-12">
            <iframe
              title="Карта расположения"
              src="https://yandex.ru/map-widget/v1/-/CBucU6V~8B"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Feedback_fromselection
        handleSubmit={handleSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        rating={rating}
        setRating={setRating}
      />
    </div>
  );
}

function Upper_Blocks() {
  return (
    <div className="grid gap-4 md:gap-8 mb-8 md:mb-12 md:grid-cols-2">
      <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 md:mb-4 text-xl md:text-2xl font-semibold">Информация</h2>
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center text-sm md:text-base">
            <FeatherIcon icon="map-pin" className="w-4 h-4 md:w-5 md:h-5" />
            <p className="ml-2">Проспект Вернадского 78, Москва, Россия</p>
          </div>
          <div className="flex items-center text-sm md:text-base">
            <FeatherIcon icon="clock" className="w-4 h-4 md:w-5 md:h-5" />
            <p className="ml-2">Пн-Вск: 10:00 - 22:00</p>
          </div>
          <div className="flex items-center text-sm md:text-base">
            <FeatherIcon icon="phone" className="w-4 h-4 md:w-5 md:h-5" />
            <p className="ml-2">8(800) 555-3535</p>
          </div>
          <div className="flex items-center text-sm md:text-base">
            <FeatherIcon icon="mail" className="w-4 h-4 md:w-5 md:h-5" />
            <p className="ml-2">info@noodlefoodle.com</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 md:mb-4 text-xl md:text-2xl font-semibold">Отзывы клиентов</h2>
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <FeatherIcon
                  key={star}
                  icon="star"
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              ))}
            </div>
            <span className="ml-2 text-sm md:text-base">4 из 5</span>
          </div>
          <p className="italic text-gray-600 text-sm md:text-base">
            "Лучший рамен в городе! Бульон получается невероятно сытным и ароматным."
          </p>
          <p className="italic text-gray-600 text-sm md:text-base">
            "Восхитительное обслуживание и аутентичный вкус. Обязательно вернусь!"
          </p>
        </div>
      </div>
    </div>
  );
}

function Feedback_fromselection({
  handleSubmit,
  feedback,
  setFeedback,
  rating,
  setRating
}) {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container max-w-4xl px-4 mx-auto">
        <h2 className="mb-8 md:mb-12 text-xl md:text-3xl font-bold text-center">
          Помогите нам стать лучше
        </h2>
        <div className="p-4 md:p-8 rounded-lg shadow-md bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">Имя</label>
              <input
                type="text"
                className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base border rounded-md"
                value={feedback.name}
                onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">Почта</label>
              <input
                type="email"
                className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base border rounded-md"
                value={feedback.email}
                onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">
                Как мы можем стать лучше?
              </label>
              <select
                className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base border rounded-md"
                value={feedback.improvement}
                onChange={(e) => setFeedback({ ...feedback, improvement: e.target.value })}
              >
                <option>Выберите</option>
                <option value="food">Качество еды</option>
                <option value="service">Обслуживание</option>
                <option value="delivery">Доставка</option>
                <option value="atmosphere">Атмосфера ресторана</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">
                Ваш комментарий
              </label>
              <textarea
                className="w-full h-24 md:h-32 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base border rounded-md"
                value={feedback.message}
                onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                required
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">
                Оцените свой опыт
              </label>
              <div className="flex space-x-1 md:space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FeatherIcon
                    key={star}
                    icon="star"
                    className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 md:px-6 md:py-3 text-sm md:text-base text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
