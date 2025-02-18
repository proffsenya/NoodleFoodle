import React, { useState } from "react";


import Header from "../components/Header";
import Footer from "../components/Footer";

import "../src/index.css";


export default function Home() {

    return (
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <PopularDishes />
        <ContactSection />
        <Footer />
      </div>
    );
  }
 
  function HeroSection(){
    const [address, setAddress] = useState("");
  
    return (
      <section id="home" className="relative pt-20">
          <div className="h-[600px] relative">
            <img
              src="./img/video5.gif"
              alt="Delicious Noodles"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white bg-black bg-opacity-50">
              <h1 className="mb-4 text-5xl font-bold">Добро пожаловать в NoodleFoodle</h1>
              <p className="max-w-2xl mb-8 text-xl text-center">
              Попробуйте настоящую азиатскую лапшу, которую доставят прямо к вам на дом.
              </p>
              <div className="relative flex w-full max-w-md">
                <input
                  type="text"
                  placeholder="Enter delivery address"
                  className="w-full px-4 py-3 text-black rounded-l-md"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button className="flex items-center px-6 py-3 text-white bg-black rounded-r-md hover:bg-gray-800">
                </button>
              </div>
            </div>
          </div>
        </section>
    )
  }
  
  function FeaturesSection() {
    return (
      <section className="px-4 py-16">
          <h2 className="mb-12 text-3xl font-bold text-center">
           Почему выбирают NoodleFoodle?
          </h2>
          <div className="container grid gap-8 mx-auto md:grid-cols-3">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80"
                alt="Fresh Noodles"
                className="object-cover w-full h-64 mb-4 rounded-lg"
              />
              <h3 className="mb-2 text-xl font-semibold">Рецепты</h3>
              <p className="text-gray-600">
              Традиционные рецепты, передаваемые из поколения в поколение
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80"
                alt="Quick Delivery"
                className="object-cover w-full h-64 mb-4 rounded-lg"
              />
              <h3 className="mb-2 text-xl font-semibold">Быстрая доставка</h3>
              <p className="text-gray-600">
              Горячая и свежая лапша с доставкой к вашей двери
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80"
                alt="Quality Ingredients"
                className="object-cover w-full h-64 mb-4 rounded-lg"
              />
              <h3 className="mb-2 text-xl font-semibold">Свежие ингредиенты</h3>
              <p className="text-gray-600">
              В каждом блюде только лучшие ингредиенты
              </p>
            </div>
          </div>
        </section>
    )
  }
  
  function PopularDishes(){
    return (
      <section id="menu" className="px-4 py-16 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="mb-12 text-3xl font-bold text-center">
              Популярные блюда
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Классический",
                  price: "699₽",
                  image:
                    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80",
                },
                {
                  name: "Острый мисо",
                  price: "699₽",
                  image:
                    "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&q=80",
                },
                {
                  name: "Вегетарианский",
                  price: "699₽",
                  image:
                    "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80",
                },
              ].map((dish, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-white rounded-lg shadow-md"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-4">
                    <h3 className="mb-2 text-xl font-semibold">{dish.name}</h3>
                    <p className="mb-4 text-gray-600">
                    Свежая лапша в пикантном бульоне с традиционными начинками
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">{dish.price}</span>
                      <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800">
                        Заказать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    )
  }
  
  function ContactSection(){
    return (
      <section id="contact" className="px-4 py-16">
          <div className="container max-w-4xl mx-auto">
            <h2 className="mb-12 text-3xl font-bold text-center">О нас</h2>
            <div className="p-8 bg-white rounded-lg shadow-md">
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 text-gray-700">Имя</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Почта</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Комментарий</label>
                  <textarea className="w-full h-32 px-4 py-2 border rounded-md"></textarea>
                </div>
                <button className="w-full px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800">
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </section>
    )
  }